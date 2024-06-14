import React from 'react';
import { Project } from '../types/Project';

interface EmployeeTableProps {
    projects: Project[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ projects, onEdit, onDelete }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Manager</th>
                        <th>Project type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Comment</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.projectManager.fullName}</td>
                            <td>{project.projectType.name}</td>
                            <td>{new Date(project.startDate).toLocaleDateString()}</td>
                            <td>{new Date(project.endDate).toLocaleDateString()}</td>
                            <td>{project.comment}</td>
                            <td>{project.status ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button onClick={() => onEdit(project.id)}>Edit</button>
                                <button onClick={() => onDelete(project.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;