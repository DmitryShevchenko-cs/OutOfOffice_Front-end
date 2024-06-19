import { Employee, ProjectManager } from "./Emloyees";
import { ProjectType } from "./Selections";

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

export interface UpdateProject {
    id: number
    projectManagerId: number
    projectTypeId: number
    startDate: string
    endDate: string
    comment: string
    status: boolean
}

export interface CreateProject {
    projectTypeId: number
    startDate: string
    endDate: string
    comment: string
    status: boolean
}

export interface AddEmployees{
    projectId: number
    employeesIds: number[]
}