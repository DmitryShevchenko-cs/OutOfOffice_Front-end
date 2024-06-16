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

export enum LeaveRequestStatus{
    Submitted = "Submitted",
    Canceled = "Canceled"
}

export interface UpdateApprovalRequest {
    id: number
    absenceReasonId: number
    approvalRequestId : number
    startDate: Date
    endDate: Date
    status: LeaveRequestStatus
    comment: string | null
}