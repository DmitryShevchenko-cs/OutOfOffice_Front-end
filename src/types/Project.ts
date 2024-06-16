import { ProjectManager } from "./Emloyees";
import { ProjectType } from "./selections";

export interface Project {
    id: number
    projectManager: ProjectManager
    projectType: ProjectType
    startDate: Date
    endDate: Date
    comment: string
    status: boolean
}