import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { LeaveRequest } from "../types/LeaveRequest";

export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeaveRequests: builder.query<LeaveRequest[], null>({
        query: () => ({
          url: "/api/leaverequest/all",
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
  }),
});

export const { useGetAllLeaveRequestsQuery } = Api;
