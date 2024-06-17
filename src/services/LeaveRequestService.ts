import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { CreateLeaveRequest, LeaveRequest, UpdateLeaveRequest } from "../types/LeaveRequest";

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
    updateLeaveRequest: builder.mutation<null, UpdateLeaveRequest>({
      query: (data) => ({
        url: `/api/leaverequest`,
        method: HttpMethodType.PUT,
        body: data,
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
      query: (requestId:number) => ({
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
    createLeaveRequest: builder.mutation({
      query: (data:CreateLeaveRequest) => ({
        url: `/api/leaverequest`,
        body:data,
        method: HttpMethodType.POST,
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

export const { useGetAllLeaveRequestsQuery, useUpdateLeaveRequestMutation, useGetLeaveRequestQuery, useDelLeaveRequestMutation, useCreateLeaveRequestMutation} = Api;
