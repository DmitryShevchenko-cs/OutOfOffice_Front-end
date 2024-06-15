import { ApprovalRequest } from "./ApprovalRequest";
import { Employee } from "./Emloyees";

export interface LeaveRequest {
    id: number
    employee: Employee
    approvalRequest: ApprovalRequest
    absenceReason : AbsenceReason
    startDate: Date
    endDate: Date
    status: string
    comment: string
}

export interface AbsenceReason {
    id: number,
    reasonDescription: string
}
