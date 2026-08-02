import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";

export type DashboardMetrics = {
  users: {
    total: number;
    active: number;
    inactive: number;
  };
  pendingKyc: number;
  volume: number;
  masterWallet: number;
};

export type RevenueSummary = {
  from: string | null;
  to: string | null;
  totalTransactions: number;
  totalVolume: string;
  feeRevenue: string;
};

export type ReconciliationResult = {
  asset: string;
  liabilities: string;
  masterBalance: string;
  unsweptBalance: string;
  custody: string;
  difference: string;
  healthy: boolean;
  checkedAt: string;
};

type ApiEnvelope<T> = {
  status: boolean;
  message: string;
  data: T;
};

type GetRevenueParams = {
  from?: string;
  to?: string;
};

export const dashboard = createApi({
  reducerPath: "dashboardApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["DashboardMetrics", "Revenue", "Reconciliation"],
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => ({
        url: "/admin/metrics/dashboard",
        method: "GET",
      }),
      transformResponse: (response: ApiEnvelope<DashboardMetrics>) => response.data,
      providesTags: ["DashboardMetrics"],
    }),

    getRevenue: builder.query<RevenueSummary, GetRevenueParams | void>({
      query: (params) => ({
        url: "/admin/revenue",
        method: "GET",
        params: {
          from: params?.from || undefined,
          to: params?.to || undefined,
        },
      }),
      transformResponse: (response: ApiEnvelope<RevenueSummary>) => response.data,
      providesTags: ["Revenue"],
    }),

    getReconciliation: builder.query<ReconciliationResult, void>({
      query: () => ({
        url: "/admin/reconciliation",
        method: "GET",
      }),
      transformResponse: (response: ApiEnvelope<ReconciliationResult>) => response.data,
      providesTags: ["Reconciliation"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetRevenueQuery,
  useGetReconciliationQuery,
} = dashboard;