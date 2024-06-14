import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, Button } from '@mui/material';
import { ApprovalRequest } from '../types/ApprovalRequest';

interface TableProps {
    approvalRequests: ApprovalRequest[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

// Перечисление для полей, по которым можно сортировать
enum SortField {
    ID = 'id',
    STATUS = 'approvalRequest.status',
    COMMENT = 'approvalRequest.comment',
    APPROVER_NAME = 'approvalRequest.approver?.fullname',
}

const ApprovalRequestTable: React.FC<TableProps> = ({ approvalRequests, onEdit, onDelete }) => {
    const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Helper function to get the value by path
    const getFieldByPath = (obj: any, path: string): any => {
        const keys = path.split('.');
        return keys.reduce((acc, key) => acc[key], obj);
    };

    // Function to sort leave requests
    const sortedApprovalRequest = [...approvalRequests].sort((a, b) => {
        const aValue = getFieldByPath(a, sortBy);
        const bValue = getFieldByPath(b, sortBy);

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

    return (
        <TableContainer>
            <Table sx={{backgroundColor:"white", borderRadius:"10px"}}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)"}}>
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
                                active={sortBy === SortField.APPROVER_NAME}
                                direction={sortBy === SortField.APPROVER_NAME ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.APPROVER_NAME)}
                            >
                                Approver
                            </TableSortLabel>
                        </TableCell>
                        <TableCell  sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Photo</TableCell>
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
                                active={sortBy === SortField.COMMENT}
                                direction={sortBy === SortField.COMMENT ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.COMMENT)}
                            >
                                Comment
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedApprovalRequest.map((approvalRequest) => (
                        <TableRow key={approvalRequest.id}>
                            <TableCell>{approvalRequest.id}</TableCell>
                            <TableCell>{approvalRequest.approver?.fullName}</TableCell>
                            <TableCell>{approvalRequest.approver?.photo}</TableCell>
                            <TableCell>{approvalRequest.status}</TableCell>
                            <TableCell>{approvalRequest.comment}</TableCell>
                            <TableCell>
                                <Button onClick={() => onEdit(approvalRequest.id)}>Edit</Button>
                                <Button sx={{color:"red"}} onClick={() => onDelete(approvalRequest.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ApprovalRequestTable;