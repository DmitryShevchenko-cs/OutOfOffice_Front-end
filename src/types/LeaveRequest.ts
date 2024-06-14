import { ApprovalRequest } from "./ApprovalRequest";
import { Employee } from "./Emloyees";

export interface LeaveRequest {
    id: number,
    employee: Employee
    approvalRequest: ApprovalRequest
    startDate: Date,
    endDate: Date,
    commnet: string
}

export interface AbsenceReason {
    id: number,
    reasonDescription: string
}
