import { api } from "../api/api";
import { ApprovalRequest, ApprovalUpdateRequest } from "../types/ApprovalRequest";
import { HttpMethodType } from "../types/HttpInfo";

export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllApprovalRequest: builder.query<ApprovalRequest[], null>({
      query: () => ({
        url: "/api/ApprovalRequest",
        method: HttpMethodType.GET,
        responseHandler: async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
          }
          return response.json();
        },
      }),
    }),
    approveRequest: builder.mutation({
      query: (data: ApprovalUpdateRequest) => ({
        body: data,
        url: "/api/ApprovalRequest/approve",
        method: HttpMethodType.PUT,
        responseHandler: async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
          }
          return response.json();
        },
      }),
    }),
    declineRequest: builder.mutation({
      query: (data: ApprovalUpdateRequest) => ({
        body: data,
        url: "/api/ApprovalRequest/decline",
        method: HttpMethodType.PUT,
        responseHandler: async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
          }
          return response.json();
        },
      }),
    }),
  }),
});

export const { useGetAllApprovalRequestQuery, useApproveRequestMutation, useDeclineRequestMutation } = Api;
