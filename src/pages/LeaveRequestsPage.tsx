import React, { useEffect, useState } from "react";
import LeaveRequestTable from "../Components/Tables/LeaveRequestTable";
import { useDelLeaveRequestMutation, useGetAllLeaveRequestsQuery } from "../services/LeaveRequestService";
import { LeaveRequest } from "../types/LeaveRequest";

const LeaveRequestsPage = () => {

  const {data: leaveRequestList } = useGetAllLeaveRequestsQuery(null);

  const [leaveRequests, setleaveRequests] = useState<LeaveRequest[]>([])

  const [deleteLeaveRequest] = useDelLeaveRequestMutation();

  useEffect(() => {
    if (leaveRequestList) {
      setleaveRequests(leaveRequestList);
    }
  }, [leaveRequestList]);

  const handleEdit = (id: number) => {
    // Реализация редактирования
    
  };

  const handleDelete = async (id: number) => {
    try {
      setleaveRequests(leaveRequests.filter((leaveRequest) => leaveRequest.id !== id));
      await deleteLeaveRequest(id).unwrap();
     
    }catch (error: any) {
      console.error('Failed to approve request:', error.data || error.message);
    }
    
  };


  return (
    <>
      <div>
        <h1>Leave Requests Page</h1>
      </div>     
      <LeaveRequestTable leaveRequests={leaveRequests} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};

export default LeaveRequestsPage;
