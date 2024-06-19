import { api } from "../api/api";
import { BaseManager, CreateManager, DetailManager, HrManager, ProjectManager, UpdateManager } from "../types/Emloyees";
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
    getDetailsManager: builder.query<DetailManager, number>({
      query: (managerId) => ({
        url: `/api/manager/${managerId}`,
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
    getProjectManagers: builder.query<ProjectManager[], null>({
      query: () => ({
        url: "/api/manager/project-managers",
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
    getHrManagers: builder.query<HrManager[], null>({
      query: () => ({
        url: "/api/manager/hr-managers",
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
    delManager: builder.mutation({
      query: (requestId:number) => ({
        url: `/api/manager/${requestId}`,
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
    createProjectManager: builder.mutation({
      query: (manager:CreateManager) => ({
        url: `/api/manager/project-manager`,
        method: HttpMethodType.POST,
        body:manager,
        responseHandler: async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
          }
          return response.json();
        },
      }),
    }),
    createHrManager: builder.mutation({
      query: (manager:CreateManager) => ({
        url: `/api/manager/hr-manager`,
        method: HttpMethodType.POST,
        body: manager,
        responseHandler: async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
          }
          return response.json();
        },
      }),
    }),
    UpdateManager: builder.mutation({
      query: (manager:UpdateManager) => ({
        url: `/api/manager`,
        method: HttpMethodType.PUT,
        body: manager,
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

export const { useGetAllManagersQuery, useGetApproversQuery, useGetDetailsManagerQuery,
  useDelManagerMutation, useGetProjectManagersQuery, useGetHrManagersQuery,
  useCreateHrManagerMutation, useCreateProjectManagerMutation, useUpdateManagerMutation
} = Api;
