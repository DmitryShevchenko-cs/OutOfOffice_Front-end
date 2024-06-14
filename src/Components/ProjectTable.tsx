import React, { useState } from 'react';
import { Project } from '../types/Project';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, Button } from '@mui/material';

interface TableProps {
    projects: Project[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

// Перечисление для полей, по которым можно сортировать
enum SortField {
    ID = 'id',
    MANAGER = 'projectManager.fullName',
    TYPE = 'projectType.name',
    START_DATE = 'startDate',
    END_DATE = 'endDate',
    STATUS = 'status',
}

const EmployeeTable: React.FC<TableProps> = ({ projects, onEdit, onDelete }) => {
    const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Вспомогательная функция для получения значения поля по пути
    const getFieldByPath = (obj: any, path: string): any => {
        const keys = path.split('.');
        return keys.reduce((acc, key) => acc[key], obj);
    };

    // Функция для сортировки проектов
    const sortedProjects = [...projects].sort((a, b) => {
        const aValue = getFieldByPath(a, sortBy);
        const bValue = getFieldByPath(b, sortBy);

        // Определение направления сортировки
        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
    });

    // Обработчик клика по заголовку столбца для сортировки
    const handleSort = (field: SortField) => {
        if (field === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    return (
        <TableContainer>
            <Table sx={{backgroundColor:"white", borderRadius:"10px"}}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.ID}
                                direction={sortBy === SortField.ID ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.ID)}
                            >
                                ID
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.MANAGER}
                                direction={sortBy === SortField.MANAGER ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.MANAGER)}
                            >
                                Manager
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.TYPE}
                                direction={sortBy === SortField.TYPE ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.TYPE)}
                            >
                                Project type
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.START_DATE}
                                direction={sortBy === SortField.START_DATE ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.START_DATE)}
                            >
                                Start Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.END_DATE}
                                direction={sortBy === SortField.END_DATE ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.END_DATE)}
                            >
                                End Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Comment</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.STATUS}
                                direction={sortBy === SortField.STATUS ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.STATUS)}
                            >
                                Status
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedProjects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>{project.id}</TableCell>
                            <TableCell>{project.projectManager.fullName}</TableCell>
                            <TableCell>{project.projectType.name}</TableCell>
                            <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                            <TableCell>{project.comment}</TableCell>
                            <TableCell>{project.status ? 'Active' : 'Inactive'}</TableCell>
                            <TableCell>
                                <Button onClick={() => onEdit(project.id)}>Edit</Button>
                                <Button sx={{color:"red"}} onClick={() => onDelete(project.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeTable;
