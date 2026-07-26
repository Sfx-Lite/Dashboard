import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { RootState } from "../store";
import { logout, setCredentials } from "../store/authSlice";

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

let refreshPromise: Promise<string | null> | null = null;

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
  async ({ url, method, data, params }, { getState, dispatch }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;

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
        try {
          refreshPromise =
            refreshPromise ??
            axiosInstance
              .post("/auth/refresh", { refreshToken: state.auth.refreshToken })
              .then((res) => {
                const { accessToken, refreshToken, user } = res.data.data;
                dispatch(setCredentials({ accessToken, refreshToken, user }));
                return accessToken as string;
              })
              .catch(() => {
                dispatch(logout());
                return null;
              })
              .finally(() => {
                refreshPromise = null;
              });

          const newToken = await refreshPromise;

          if (newToken) {
            const retryResult = await axiosInstance({
              url,
              method,
              data,
              params,
              headers: { Authorization: `Bearer ${newToken}` },
            });
            return { data: retryResult.data };
          }
        } catch {
          dispatch(logout());
        }
      }

      if (err.response?.status === 401) {
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