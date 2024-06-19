import { ApprovalRequest } from "./ApprovalRequest";
import { Employee } from "./Emloyees";
import { AbsenceReason } from "./Selection";

export interface LeaveRequest {
    id: number
    employee: Employee
    approvalRequest: ApprovalRequest
    absenceReason : AbsenceReason
    startDate: Date
    endDate: Date
    status: LeaveRequestStatus
    comment: string
}

export enum LeaveRequestStatus{
    Submitted = "Submitted",
    Canceled = "Canceled"
}

export interface UpdateLeaveRequest {
    id: number
    absenceReasonId: number
    approverId : number
    startDate: string
    endDate: string
    status: LeaveRequestStatus
    comment: string | null
}

export interface CreateLeaveRequest {
    absenceReasonId: number
    approverId : number
    startDate: string
    endDate: string
    comment: string | null
}