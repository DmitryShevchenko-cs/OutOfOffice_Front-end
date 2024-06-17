import { Employee, ProjectManager } from "./Emloyees";
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

export interface ProjectDetail {
    id: number
    projectManager: ProjectManager
    projectType: ProjectType
    startDate: Date
    endDate: Date
    comment: string
    status: boolean
    employees: Employee[]
}