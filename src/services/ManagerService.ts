import { api } from "../api/api";
import { BaseManager } from "../types/Emloyees";
import { HttpMethodType } from "../types/HttpInfo";

export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllManagers: builder.query<BaseManager[], null>({
      query: () => ({
        url: "/api/manager",
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
    getApprovers: builder.query<BaseManager[], null>({
      query: () => ({
        url: "/api/manager/approvers",
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

export const { useGetAllManagersQuery, useGetApproversQuery} = Api;
