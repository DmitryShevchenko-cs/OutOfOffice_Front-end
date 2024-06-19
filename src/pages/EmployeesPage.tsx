import React, { useEffect, useState } from "react";
import EmployeeTable from "../Components/Tables/EmployeeTable";
import { Employee } from "../types/Emloyees";
import { useDeactivateEmployeeMutation, useGetEmployeesQuery } from "../services/EmployeeService";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserType } from "../types/User";

const EmployeesPage = () => {

  const { data: employeesList } = useGetEmployeesQuery(null);
  const role = useSelector((state: RootState) => state.auth.role);
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
    } catch (error: any) {
      console.error('Failed to approve request:', error.data || error.message);
    }
    window.location.reload();
  };

  return (
    <>
      <div>
        <h1>Employees Page</h1>
      </div>
      {(role === UserType.Admin || role === UserType.HrManager) && (
        <Button
          component={Link}
          to="/create-employee"
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
        >
          Create employee
        </Button>
      )}
      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </>
  );
};

export default EmployeesPage;
