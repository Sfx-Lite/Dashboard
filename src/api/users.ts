import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";
import type { KycStatus } from "./kyc";

export type UserRole = "user" | "admin" | "super_admin";

export type AdminUser = {
  id: string;
  username: string;
  email: string;
  mobileNumber: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  streetAddress1: string | null;
  streetAddress2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  tier: number;
  role: UserRole;
  kycStatus: KycStatus;
  isPin: boolean;
  suspended: boolean;
  suspendedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetUsersParams = {
  limit?: number;
  offset?: number;
  search?: string;
  role?: UserRole;
  kycStatus?: KycStatus;
  suspended?: boolean;
};

type ApiEnvelope<T> = {
  status: boolean;
  message: string;
  data: T;
};

type UsersListResponse = ApiEnvelope<{
  users: AdminUser[];
  total: number;
  limit: number;
  offset: number;
}>;

export type UsersListResult = {
  users: AdminUser[];
  total: number;
};

export type ToggleUserStatusResult = AdminUser;

export const users = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersListResult, GetUsersParams | void>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params: {
          limit: params?.limit ?? 20,
          offset: params?.offset ?? 0,
          search: params?.search || undefined,
          role: params?.role || undefined,
          kycStatus: params?.kycStatus || undefined,
          suspended:
            params?.suspended === undefined ? undefined : String(params.suspended),
        },
      }),
      transformResponse: (response: UsersListResponse): UsersListResult => ({
        users: response.data.users,
        total: response.data.total,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map((u) => ({ type: "User" as const, id: u.id })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),
    toggleUserStatus: builder.mutation<ToggleUserStatusResult, string>({
      query: (id) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
      }),
      transformResponse: (response: ApiEnvelope<AdminUser>) => response.data,
      invalidatesTags: (_result, _error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetUsersQuery, useToggleUserStatusMutation } = users;