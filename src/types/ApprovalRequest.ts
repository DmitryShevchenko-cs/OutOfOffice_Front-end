import { BaseManager } from "./Emloyees";
import { LeaveRequest } from "./LeaveRequest";

export interface ApprovalRequest {
    id: number,
    approver: BaseManager | null
    leaveRequest : LeaveRequest
    status: Status
    comment: string | null
}
export enum Status {
    New = "New",
    Approved = "Approved",
    Decline = "Decline"
} 
