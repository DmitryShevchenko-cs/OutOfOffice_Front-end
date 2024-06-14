import { BaseManager } from "./Emloyees";

export interface ApprovalRequest {
    id: number,
    approver: BaseManager | null
    status: Status
    comment: string | null
}
export enum Status {
    New = "New",
    Approved = "Approved",
    Decline = "Decline"
} 
