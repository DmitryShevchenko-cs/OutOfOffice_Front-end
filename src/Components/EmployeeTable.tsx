import React from 'react';
import { Employee } from '../types/Emloyees';
import style from "../scss/EmployeeTable.module.scss"

interface EmployeeTableProps {
    employees: Employee[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Photo</th>
                        <th>Subdivision</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Out Of Office Balance</th>
                        <th>HR Manager</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.fullName}</td>
                            <td><img src={employee.photo} alt="photo" /></td>
                            <td>{employee.subdivision.name}</td>
                            <td>{employee.position.name}</td>
                            <td>{employee.status ? 'Active' : 'Inactive'}</td>
                            <td>{employee.outOfOfficeBalance}</td>
                            <td>{employee.hrManager?.fullName}</td>
                            <td>
                                <button onClick={() => onEdit(employee.id)}>Edit</button>
                                <button onClick={() => onDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;