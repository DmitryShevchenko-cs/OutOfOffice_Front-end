import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, Button } from '@mui/material';
import { BaseManager } from '../../types/Emloyees';
import { UserType } from '../../types/User';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

interface TableProps {
    managers: BaseManager[];
    onDelete: (id: number) => void;
}

// Перечисление для полей, по которым можно сортировать
enum SortField {
    ID = 'id',
    FULL_NAME = 'fullName'
}

const EmployeeTable: React.FC<TableProps> = ({ managers, onDelete }) => {
    const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const role = useSelector((state: RootState) => state.auth.role);

    // Вспомогательная функция для получения значения поля по пути
    const getFieldByPath = (obj: any, path: string): any => {
        const keys = path.split('.');
        return keys.reduce((acc, key) => acc[key], obj);
    };

    // Функция для сортировки сотрудников
    const sortedManagers = [...managers].sort((a, b) => {
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

    const canEditOrDelete = (role: string) => {
        return role === UserType.Admin || UserType.HrManager;
    };

    return (
        <TableContainer>
            <Table sx={{ backgroundColor: "white", borderRadius: "10px" }}>
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
                                active={sortBy === SortField.FULL_NAME}
                                direction={sortBy === SortField.FULL_NAME ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.FULL_NAME)}
                            >
                                Full Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.FULL_NAME}
                                direction={sortBy === SortField.FULL_NAME ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.FULL_NAME)}
                            >
                                ManagerType
                            </TableSortLabel>
                        </TableCell>
                        {canEditOrDelete(role) && <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedManagers.map((manager) => (
                        <TableRow key={manager.id}>
                             <TableCell>
                                <Link to={`/manager/${manager.id}`}>
                                    {manager.id}
                                </Link>
                            </TableCell>
                            <TableCell>{manager.fullName}</TableCell>
                            <TableCell>{manager.role}</TableCell>
                            {canEditOrDelete(role) && (
                                <TableCell>
                                    <Button sx={{ border: "1px solid green", color: "green", marginRight:"5px"}}
                                        component={Link}
                                        to={`/update-manager/${manager.id}`}
                                    >
                                        Edit manager</Button>
                                    <Button sx={{ border: "1px solid red", color: "red" }} onClick={() => onDelete(manager.id)}>Delete</Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeTable;
