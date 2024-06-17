import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, Button, TextField } from '@mui/material';
import { ApprovalRequest, Status } from '../../types/ApprovalRequest';
import { UserType } from '../../types/User';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface TableProps {
    approvalRequests: ApprovalRequest[];
    onApprove: (id: number, comment: string) => void;
    onDecline: (id: number, comment: string) => void;
    comments: { [key: number]: string };
    setComments: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
}

enum SortField {
    ID = 'id',
    STATUS = 'approvalRequest.approvalRequestStatus',
    COMMENT = 'approvalRequest.comment',
    APPROVER_NAME = 'approvalRequest.approver.fullname',
    LEAVE_REQUEST_ID = 'approvalRequest.leaveRequest.id',
}

const ApprovalRequestTable: React.FC<TableProps> = ({ approvalRequests, onApprove, onDecline, comments, setComments }) => {
    const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const role: string = useSelector((state: RootState) => state.auth.role);

    // Helper function to get the value by path
    const getFieldByPath = (obj: any, path: string): any => {
        const keys: string[] = path.split('.');
        return keys.reduce((acc, key) => acc && acc[key] !== undefined ? acc[key] : undefined, obj);
    };
    

    // Function to sort approval requests
    const sortedApprovalRequest: ApprovalRequest[] = [...approvalRequests].sort((a, b) => {
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
    

    const handleSort = (field: SortField): void => {
        if (field === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    const canEditOrDelete = (role: string): boolean => {
        return role === UserType.Admin || role === UserType.HrManager || role === UserType.HrManager;
    };

    const handleCommentChange = (id: number, comment: string): void => {
        setComments(prevComments => ({ ...prevComments, [id]: comment }));
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
                                active={sortBy === SortField.APPROVER_NAME}
                                direction={sortBy === SortField.APPROVER_NAME ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.APPROVER_NAME)}
                            >
                                Approver
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Photo</TableCell>
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
                                active={sortBy === SortField.LEAVE_REQUEST_ID}
                                direction={sortBy === SortField.LEAVE_REQUEST_ID ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.LEAVE_REQUEST_ID)}
                            >
                                Leave Request Id
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Comment</TableCell>
                        {canEditOrDelete(role) && <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedApprovalRequest.map((approvalRequest: ApprovalRequest) => (
                        <TableRow key={approvalRequest.id}>
                            <TableCell>{approvalRequest.id}</TableCell>
                            <TableCell>{approvalRequest.approver.fullName}</TableCell>
                            <TableCell><img src={approvalRequest.approver.photo} alt="photo" /></TableCell>
                            <TableCell>{approvalRequest.approvalRequestStatus}</TableCell>
                            <TableCell>
                                <Link to={`/leave-request-details/${approvalRequest.leaveRequest.id}`}>
                                    {approvalRequest.leaveRequest.id}
                                </Link>
                            </TableCell>

                            {approvalRequest.approvalRequestStatus === Status.New ?
                                (<TableCell><TextField variant="outlined" size="small" placeholder="Enter comment" value={comments[approvalRequest.id] || ""} onChange={(e) => handleCommentChange(approvalRequest.id, e.target.value)} /></TableCell>) :
                                (<TableCell>{approvalRequest.comment}</TableCell>)}
                            <TableCell>
                                {canEditOrDelete(role) && approvalRequest.approvalRequestStatus === Status.New && (
                                    <>
                                        <Button sx={{ color: "green", border: "1px solid green", marginRight: "5px" }} onClick={() => onApprove(approvalRequest.id, comments[approvalRequest.id] || "")}>Approve</Button>
                                        <Button sx={{ color: "red", border: "1px solid red" }} onClick={() => onDecline(approvalRequest.id, comments[approvalRequest.id] || "")}>Decline</Button>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ApprovalRequestTable;

