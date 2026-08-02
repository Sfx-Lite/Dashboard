import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";

export type TransactionType = "deposit" | "internal_transfer" | "withdrawal" | "sweep";
export type TransactionStatus = "pending" | "processing" | "successful" | "failed";

export type Transaction = {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  asset: string;
  amount: string;
  fee: string;
  note: string | null;
  fromUserId: string | null;
  fromUsername: string | null;
  toUserId: string | null;
  toUsername: string | null;
  externalAddress: string | null;
  txHash: string | null;
  createdAt: string;
};

export type LedgerEntry = {
  id: string;
  userId: string;
  direction: "debit" | "credit";
  asset: string;
  amount: string;
  balanceAfter: string;
  createdAt: string;
};

export type TransactionDetail = {
  transaction: Transaction;
  ledgerEntries: LedgerEntry[];
};

export type GetTransactionsParams = {
  limit?: number;
  offset?: number;
  type?: TransactionType;
  status?: TransactionStatus;
  userId?: string;
  from?: string;
  to?: string;
  search?: string;
};

type ApiEnvelope<T> = {
  status: boolean;
  message: string;
  data: T;
};

type TransactionsListData = {
  items: Transaction[];
  total: number;
  limit: number;
  offset: number;
};

export type TransactionsListResult = {
  items: Transaction[];
  total: number;
};

export const transactions = createApi({
  reducerPath: "transactions",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionsListResult, GetTransactionsParams | void>({
      query: (params) => ({
        url: "/transactions/list",
        method: "GET",
        params: {
          limit: params?.limit ?? 20,
          offset: params?.offset ?? 0,
          type: params?.type || undefined,
          status: params?.status || undefined,
          userId: params?.userId || undefined,
          from: params?.from || undefined,
          to: params?.to || undefined,
          search: params?.search || undefined,
        },
      }),
      transformResponse: (response: ApiEnvelope<TransactionsListData>): TransactionsListResult => ({
        items: response.data.items,
        total: response.data.total,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((t) => ({ type: "Transaction" as const, id: t.id })),
              { type: "Transaction" as const, id: "LIST" },
            ]
          : [{ type: "Transaction" as const, id: "LIST" }],
    }),

    getTransactionDetail: builder.query<TransactionDetail, string>({
      query: (id) => ({
        url: `/transactions/${id}/detail`,
        method: "GET",
      }),
      transformResponse: (response: ApiEnvelope<TransactionDetail>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Transaction", id }],
    }),
  }),
});

export const { useGetTransactionsQuery, useGetTransactionDetailQuery } = transactions;