import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { LeaveRequest, UpdateLeaveRequest } from "../types/LeaveRequest";

export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeaveRequests: builder.query<LeaveRequest[], null>({
      query: () => ({
        url: "/api/leaverequest",
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
    updateLeaveRequest: builder.query<null, UpdateLeaveRequest>({
      query: (data) => ({
        body: data,
        url: "/api/leaverequest",
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
    getLeaveRequest: builder.query<LeaveRequest, number>({
      query: (requestId) => ({
        url: `/api/leaverequest/${requestId}`,
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

    delLeaveRequest: builder.mutation({
      query: (requestId) => ({
        url: `/api/leaverequest/${requestId}`,
        method: HttpMethodType.DELETE,
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

export const { useGetAllLeaveRequestsQuery, useUpdateLeaveRequestQuery, useGetLeaveRequestQuery, useDelLeaveRequestMutation} = Api;
