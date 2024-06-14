import React, { useEffect, useState } from "react";
import EmployeeTable from "../Components/EmployeeTable";
import { Employee } from "../types/Emloyees";
import { useGetAllEmployeesQuery } from "../services/EmployeeService";

const EmployeesPage = () => {

  const {data: employeesList } = useGetAllEmployeesQuery(null);

  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    if (employeesList) {
      setEmployees(employeesList);
    }
  }, [employeesList]);

  const handleEdit = (id: number) => {
    // Реализация редактирования
    console.log(`Edit employee with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Реализация удаления
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <>
      <div>
        <h1>Employees Page</h1>
      </div>
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};

export default EmployeesPage;
