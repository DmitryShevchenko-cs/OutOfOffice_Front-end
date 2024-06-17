import React, { useEffect, useState } from "react";
import LeaveRequestTable from "../Components/Tables/LeaveRequestTable";
import { useDelLeaveRequestMutation, useGetAllLeaveRequestsQuery } from "../services/LeaveRequestService";
import { LeaveRequest } from "../types/LeaveRequest";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const LeaveRequestsPage = () => {

  const {data: leaveRequestList } = useGetAllLeaveRequestsQuery(null);

  const [leaveRequests, setleaveRequests] = useState<LeaveRequest[]>([])

  const [deleteLeaveRequest] = useDelLeaveRequestMutation();

  useEffect(() => {
    if (leaveRequestList) {
      setleaveRequests(leaveRequestList);
    }
  }, [leaveRequestList]);

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
      <Button
        component={Link}
        to="/create-leave-request"
        variant="contained"
        color="primary"
        sx={{ mt: 2, mb: 2 }} // Пример использования sx для простой настройки отступов
      >
        Create Leave Request
      </Button>
      <LeaveRequestTable leaveRequests={leaveRequests} onDelete={handleDelete} />
    </>
  );
};

export default LeaveRequestsPage;
 