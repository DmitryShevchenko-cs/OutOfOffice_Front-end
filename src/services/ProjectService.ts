import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { Project, ProjectDetail } from "../types/Project";

export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjets: builder.query<Project[], null>({
      query: () => ({
        url: "/api/Project",
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
    getProjet: builder.query<ProjectDetail, number>({
      query: (projectId:number) => ({
        url: `/api/Project/${projectId}`,
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
    deactivateProject: builder.mutation({
      query: (requestId:number) => ({
        url: `/api/project/deactivate/${requestId}`,
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

export const { useGetAllProjetsQuery, useGetProjetQuery, useDeactivateProjectMutation} = Api;
