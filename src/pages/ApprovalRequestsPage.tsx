import React, { useEffect, useState } from "react";
import { ApprovalRequest } from "../types/ApprovalRequest";
import { useGetAllApprovalRequestQuery } from "../services/ApprovalRequest";
import ApprovalRequestTable from "../Components/ApprovalRequestTable";

const ApprovalRequestsPage = () => {

  const {data: approvalRequestList } = useGetAllApprovalRequestQuery(null);

  const [approvalRequests, setapprovalRequests] = useState<ApprovalRequest[]>([])

  useEffect(() => {
    if (approvalRequestList) {
      setapprovalRequests(approvalRequestList);
    }
  }, [approvalRequestList]);

  const handleEdit = (id: number) => {
    // Реализация редактирования
    
  };

  const handleDelete = (id: number) => {
    // Реализация удаления
    setapprovalRequests(approvalRequests.filter((approvalRequest) => approvalRequest.id !== id));
  };

  return (
    <>
      <div>
        <h1>Approval Requests Page</h1>
      </div>     
      <ApprovalRequestTable approvalRequests={approvalRequests} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};

export default ApprovalRequestsPage;
