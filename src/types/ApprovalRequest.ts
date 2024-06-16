import { BaseManager } from "./Emloyees";
import { LeaveRequest } from "./LeaveRequest";

export interface ApprovalRequest {
    id: number
    approver: BaseManager | null
    leaveRequest : LeaveRequest
    approvalRequestStatus: Status
    comment: string | null
}
export enum Status {
    New = "New",
    Approved = "Approved",
    Decline = "Decline"
} 

export interface ApprovalUpdateRequest {
    id: number
    comment: string | null
}