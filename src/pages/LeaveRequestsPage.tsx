import React, { useEffect, useState } from "react";
import LeaveRequestTable from "../Components/Tables/LeaveRequestTable";
import { useGetAllLeaveRequestsQuery } from "../services/LeaveRequestService";
import { LeaveRequest } from "../types/LeaveRequest";

const LeaveRequestsPage = () => {

  const {data: leaveRequestList } = useGetAllLeaveRequestsQuery(null);

  const [leaveRequests, setleaveRequests] = useState<LeaveRequest[]>([])

  useEffect(() => {
    if (leaveRequestList) {
      setleaveRequests(leaveRequestList);
    }
  }, [leaveRequestList]);

  const handleEdit = (id: number) => {
    // Реализация редактирования
    
  };

  const handleDelete = (id: number) => {
    // Реализация удаления
    setleaveRequests(leaveRequests.filter((leaveRequest) => leaveRequest.id !== id));
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
