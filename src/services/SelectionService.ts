import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { AbsenceReason } from "../types/LeaveRequest";
import { Project } from "../types/Project";
import { ProjectType } from "../types/selections";

export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAbsenceReason: builder.query<AbsenceReason[], null>({
      query: () => ({
        url: "/api/selection/absence-reasons",
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
    getProjectType: builder.query<ProjectType[], null>({
      query: () => ({
        url: "/api/selection/project-type",
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

export const { useGetAbsenceReasonQuery, useGetProjectTypeQuery } = Api;
