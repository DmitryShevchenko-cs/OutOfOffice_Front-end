import { api } from "../api/api";
import { Employee } from "../types/Emloyees";
import { HttpMethodType } from "../types/HttpInfo";

export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[],null>({
        query: () => ({
          url: "/api/employee",
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
    updateEmployee: builder.query<null, null>({
      query: () => ({
        url: "/api/employee",
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

export const { useGetAllEmployeesQuery, useUpdateEmployeeQuery } = Api;
