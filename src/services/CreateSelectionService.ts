// src/services/EntityService.ts
import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { AbsenceReason } from "../types/Selection";
import { Selection } from "../types/Selection";

export const Api = api.injectEndpoints({
    endpoints: (builder) => ({
        createSubdivision: builder.mutation<Selection, Partial<Selection>>({
            query: (data) => ({
                url: "/api/subdivision",
                method: HttpMethodType.POST,
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
        createPosition: builder.mutation<Selection, Partial<Selection>>({
            query: (data) => ({
                url: "/api/position",
                method: HttpMethodType.POST,
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
        createProjectType: builder.mutation<Selection, Partial<Selection>>({
            query: (data) => ({
                url: "/api/ProjectType",
                method: HttpMethodType.POST,
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
        createAbsenceReason: builder.mutation<AbsenceReason, Partial<AbsenceReason>>({
            query: (data) => ({
                url: "/api/AbsenceReason",
                method: HttpMethodType.POST,
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
    })
});

// Export the hooks for use in functional components
export const {
    useCreateSubdivisionMutation,
    useCreatePositionMutation,
    useCreateProjectTypeMutation,
    useCreateAbsenceReasonMutation,
} = Api;
