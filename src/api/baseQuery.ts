import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { RootState, AppDispatch } from "../store";
import { logout, tokensRefreshed } from "../store/authSlice";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

type AxiosBaseQueryArgs = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};

type RefreshResponseData = {
  status: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

interface JwtPayload {
  exp?: number;
  [key: string]: unknown;
}

const EXPIRY_BUFFER_SECONDS = 30;


function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );

    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

function isTokenExpiringSoon(token: string | null | undefined): boolean {
  if (!token) return true;

  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;

  const nowInSeconds = Date.now() / 1000;
  return payload.exp - nowInSeconds <= EXPIRY_BUFFER_SECONDS;
}

let refreshPromise: Promise<string | null> | null = null;

function refreshAccessToken(refreshToken: string, dispatch: AppDispatch): Promise<string | null> {
  refreshPromise =
    refreshPromise ??
    axiosInstance
      .post<RefreshResponseData>("/auth/refresh", { refreshToken })
      .then((res) => {
        const { accessToken, refreshToken: newRefreshToken } = res.data.data;
        dispatch(tokensRefreshed({ accessToken, refreshToken: newRefreshToken }));
        return accessToken;
      })
      .catch(() => {
        dispatch(logout());
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });

  return refreshPromise;
}

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
  async ({ url, method, data, params }, { getState, dispatch }) => {
    const state = getState() as RootState;
    let token = state.auth.accessToken;

    if (token && isTokenExpiringSoon(token) && state.auth.refreshToken) {
      const refreshed = await refreshAccessToken(state.auth.refreshToken, dispatch as AppDispatch);
      if (refreshed) {
        token = refreshed;
      }
    }

    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      if (err.response?.status === 401 && state.auth.refreshToken) {
        const newToken = await refreshAccessToken(state.auth.refreshToken, dispatch as AppDispatch);

        if (newToken) {
          try {
            const retryResult = await axiosInstance({
              url,
              method,
              data,
              params,
              headers: { Authorization: `Bearer ${newToken}` },
            });
            return { data: retryResult.data };
          } catch (retryError) {
            const retryErr = retryError as AxiosError;
            return {
              error: {
                status: retryErr.response?.status,
                data: retryErr.response?.data ?? retryErr.message,
              },
            };
          }
        }
      } else if (err.response?.status === 401) {
        dispatch(logout());
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data ?? err.message,
        },
      };
    }
  };