import type { AdminUser } from './../store/authSlice';
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";

type AdminLoginRequest = {
  emailOrUsername: string;
  password: string;
};

type AdminLoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    user: AdminUser;
  };
};

export const auth = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    adminLogin: builder.mutation<AdminLoginResponse, AdminLoginRequest>({
      query: (credentials) => ({
        url: "/auth/admin/login",
        method: "POST",
        data: credentials,
      }),
    }),
  }),
});

export const { useAdminLoginMutation } = auth;