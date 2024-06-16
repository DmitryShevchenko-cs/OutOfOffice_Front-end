import React, { useEffect, useState } from "react";
import { ApprovalRequest, ApprovalUpdateRequest, Status } from "../types/ApprovalRequest";
import { useApproveRequestMutation, useDeclineRequestMutation, useGetAllApprovalRequestQuery } from "../services/ApprovalRequestService";
import ApprovalRequestTable from "../Components/ApprovalRequestTable";
import { BaseQueryError } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const ApprovalRequestsPage = () => {
  const { data: approvalRequestList } = useGetAllApprovalRequestQuery(null);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([]);
  const [approveRequest] = useApproveRequestMutation();
  const [declineRequest] = useDeclineRequestMutation();

  // errors State
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [comments, setComments] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (approvalRequestList) {
      setApprovalRequests(approvalRequestList);
    }
  }, [approvalRequestList]);
  useEffect(() => {
    if (approvalRequestList) {
      setApprovalRequests(approvalRequestList);
    }
  }, [approvalRequestList]);


  const handleApprove = async (id: number, comment: string): Promise<void> => {
    try {
      const result = await approveRequest({ id, comment }).unwrap();
      // update date in table
      const updatedRequests = approvalRequests.map((req: ApprovalRequest) =>
        req.id === id ? { ...req, approvalRequestStatus: Status.Approved, comment: comment } : req
      );
      setApprovalRequests(updatedRequests);
      setComments(prevComments => ({ ...prevComments, [id]: '' }));
    } catch (error: any) {
      //catch exception from backend
      if (error.data && error.data.startsWith('OutOfOffice.BLL.Exceptions.OutOfBalanceLimitException')) {
        setErrorMessage('Employee doesn\'t have enough days on balance');
        setShowErrorModal(true);
      } else {
        console.error('Failed to approve request:', error.data || error.message);
        alert(`Ошибка: ${error.data || error.message}`);
      }
    }
  };

  const handleDecline = async (id: number, comment: string): Promise<void> => {
    try {
      const result = await declineRequest({ id, comment }).unwrap();
      // update date in table
      const updatedRequests = approvalRequests.map((req: ApprovalRequest) =>
        req.id === id ? { ...req, approvalRequestStatus: Status.Decline, comment: comment } : req
      );
      setApprovalRequests(updatedRequests);
      setComments(prevComments => ({ ...prevComments, [id]: '' }));
    } catch (error: any) {
      //catch exception from backend
      if (error.data && error.data.startsWith('OutOfOffice.BLL.Exceptions.OutOfBalanceLimitException')) {
        setErrorMessage('Employee doesn\'t have enough days on balance');
        setShowErrorModal(true);
      } else {
        console.error('Failed to approve request:', error.data || error.message);
        alert(`Ошибка: ${error.data || error.message}`);
      }
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  return (
    <>
      <div>
        <h1>Approval Requests Page</h1>
      </div>
      <ApprovalRequestTable
        approvalRequests={approvalRequests}
        onApprove={handleApprove}
        onDecline={handleDecline}
        comments={comments} 
        setComments={setComments} 
      />

      {/* Error window */}
      <Dialog
        open={showErrorModal}
        onClose={handleCloseErrorModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
        <DialogContent>
          <div>{errorMessage}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorModal} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApprovalRequestsPage;