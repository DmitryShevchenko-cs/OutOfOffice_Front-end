import { api } from "../api/api";
import { Employee, CreateEmployee, UpdateEmployee } from "../types/Emloyees";
import { HttpMethodType } from "../types/HttpInfo";
import { ICreateUserModel } from "../types/User";

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
    getEmployee: builder.query<Employee,number>({
      query: (employeeId) => ({
        url: `/api/employee/${employeeId}`,
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

    deactivateEmployee: builder.mutation({
      query: (requestId:number) => ({
        url: `/api/employee/${requestId}`,
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
    CreateEmployee: builder.mutation({
      query: (employee:CreateEmployee) => ({
        url: `/api/employee`,
        body: employee,
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
    UpdateEmployee: builder.mutation({
      query: (employee:UpdateEmployee) => ({
        url: `/api/employee`,
        body: employee,
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

export const { useGetAllEmployeesQuery, useDeactivateEmployeeMutation, 
  useCreateEmployeeMutation, useGetEmployeeQuery, useUpdateEmployeeMutation} = Api;
