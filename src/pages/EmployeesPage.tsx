import React, { useEffect, useState } from "react";
import EmployeeTable from "../Components/Tables/EmployeeTable";
import { Employee } from "../types/Emloyees";
import { useDeactivateEmployeeMutation, useGetAllEmployeesQuery } from "../services/EmployeeService";

const EmployeesPage = () => {

  const {data: employeesList } = useGetAllEmployeesQuery(null);

  const [employees, setEmployees] = useState<Employee[]>([])

  const [deactivateEmployee] = useDeactivateEmployeeMutation();
  
  useEffect(() => {
    if (employeesList) {
      setEmployees(employeesList);
    }
  }, [employeesList]);

  const handleDelete = async (id: number) => {
    try {
      await deactivateEmployee(id).unwrap();
    }catch (error: any) {
      console.error('Failed to approve request:', error.data || error.message);
    }
    window.location.reload();
  };

  return (
    <>
      <div>
        <h1>Employees Page</h1>
      </div>
      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </>
  );
};

export default EmployeesPage;
