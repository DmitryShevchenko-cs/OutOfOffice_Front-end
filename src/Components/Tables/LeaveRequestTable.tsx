import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, Button } from '@mui/material';
import { LeaveRequest } from '../../types/LeaveRequest';
import { UserType } from '../../types/User';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

interface TableProps {
    leaveRequests: LeaveRequest[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

// Перечисление для полей, по которым можно сортировать
enum SortField {
    ID = 'id',
    EMPLOYEE_NAME = 'employee.fullName',
    START_DATE = 'startDate',
    END_DATE = 'endDate',
    APPROVAL_STATUS = 'approvalRequest.Status',
    REASON = 'reason',
    COMMENT = 'comment',
    STATUS = 'status',
}

const LeaveRequestTable: React.FC<TableProps> = ({ leaveRequests, onEdit, onDelete }) => {
    const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const role = useSelector((state: RootState) => state.auth.role);

    // Helper function to get the value by path
    const getFieldByPath = (obj: any, path: string): any => {
        const keys = path.split('.');
        return keys.reduce((acc, key) => acc && acc[key] !== undefined ? acc[key] : undefined, obj);
    };

    // Function to sort leave requests
    const sortedLeaveRequests = [...leaveRequests].sort((a, b) => {
        const aValue: any = getFieldByPath(a, sortBy);
        const bValue: any = getFieldByPath(b, sortBy);
    
        if (aValue === undefined) return 1;
        if (bValue === undefined) return -1;
    
        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
    });

    // Sort handler
    const handleSort = (field: SortField) => {
        if (field === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    const canEditOrDelete = (role: string) => {
        return role === UserType.Admin || role === UserType.Employee;
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
                                active={sortBy === SortField.EMPLOYEE_NAME}
                                direction={sortBy === SortField.EMPLOYEE_NAME ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.EMPLOYEE_NAME)}
                            >
                                Employee Name
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
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.REASON}
                                direction={sortBy === SortField.REASON ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.REASON)}
                            >
                                Reason
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.COMMENT}
                                direction={sortBy === SortField.COMMENT ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.COMMENT)}
                            >
                                Comment
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.STATUS}
                                direction={sortBy === SortField.STATUS ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.STATUS)}
                            >
                                Status
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.APPROVAL_STATUS}
                                direction={sortBy === SortField.APPROVAL_STATUS ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.APPROVAL_STATUS)}
                            >
                                Approval Status
                            </TableSortLabel>
                        </TableCell>
                        {canEditOrDelete(role) && <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedLeaveRequests.map((leaveRequest) => (
                        <TableRow key={leaveRequest.id}>
                            <TableCell>{leaveRequest.id}</TableCell>
                            <TableCell>{leaveRequest.employee.fullName}</TableCell>
                            <TableCell>{new Date(leaveRequest.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(leaveRequest.endDate).toLocaleDateString()}</TableCell>
                            <TableCell>{leaveRequest.absenceReason.reasonDescription}</TableCell>
                            <TableCell>{leaveRequest.comment}</TableCell>
                            <TableCell>{leaveRequest.status}</TableCell>
                            <TableCell>{leaveRequest.approvalRequest.approvalRequestStatus}</TableCell>
                            {canEditOrDelete(role) && (
                                <TableCell>
                                    <Button onClick={() => onEdit(leaveRequest.id)}>Edit</Button>
                                    <Button sx={{ color: "red" }} onClick={() => onDelete(leaveRequest.id)}>Delete</Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LeaveRequestTable;