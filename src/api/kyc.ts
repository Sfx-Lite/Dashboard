import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";

export type KycStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected";

export type KycSubmission = {
  id: string;
  userId: string;
  docType: string;
  docUrl: string;
  selfieUrl: string;
  status: KycStatus;
  reason: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  createdAt: string;
  updatedAt: string;
};

type GetKycSubmissionsParams = {
  status?: KycStatus;
};

type ReviewDecision = "approved" | "rejected";

type ReviewKycSubmissionBody = {
  status: ReviewDecision;
  reason?: string;
};

type ApiEnvelope<T> = {
  status: boolean;
  message: string;
  data: T;
};

export const kyc = createApi({
  reducerPath: "kyc",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["KycSubmission"],

  endpoints: (builder) => ({
    getKycSubmissions: builder.query<
      KycSubmission[],
      GetKycSubmissionsParams | void
    >({
      query: (params) => ({
        url: "/kyc/submission",
        method: "GET",
        params: params?.status
          ? { status: params.status }
          : undefined,
      }),

      transformResponse: (
        response: ApiEnvelope<KycSubmission[]>
      ) => response.data,

      providesTags: (result) =>
        result
          ? [
              ...result.map((submission) => ({
                type: "KycSubmission" as const,
                id: submission.id,
              })),
              {
                type: "KycSubmission" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "KycSubmission" as const,
                id: "LIST",
              },
            ],
    }),

    getKycSubmission: builder.query<KycSubmission, string>({
      query: (id) => ({
        url: `/kyc/submission/${id}`,
        method: "GET",
      }),

      transformResponse: (
        response: ApiEnvelope<KycSubmission>
      ) => response.data,

      providesTags: (_result, _error, id) => [
        {
          type: "KycSubmission",
          id,
        },
      ],
    }),

    reviewKycSubmission: builder.mutation<
      KycSubmission,
      {
        id: string;
        body: ReviewKycSubmissionBody;
      }
    >({
      query: ({ id, body }) => ({
        url: `/kyc/submission/${id}/status`,
        method: "PATCH",
        data: body,
      }),

      transformResponse: (
        response: ApiEnvelope<KycSubmission>
      ) => response.data,

      invalidatesTags: (_result, _error, { id }) => [
        {
          type: "KycSubmission",
          id,
        },
        {
          type: "KycSubmission",
          id: "LIST",
        },
      ],
    }),
  }),
});

export const {
  useGetKycSubmissionsQuery,
  useGetKycSubmissionQuery,
  useReviewKycSubmissionMutation,
} = kyc;