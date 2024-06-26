import { Project } from "./Project";
import { UserType } from "./User";
import { Selection } from "./Selection";

export interface BaseEmployee{
    id: number
    fullName: string
}

export interface Employee extends BaseEmployee {
    subdivision: Selection
    position: Selection
    status: boolean
    outOfOfficeBalance: number
    hrManager: HrManager | null
    projects: Project[]
}

export interface BaseManager extends BaseEmployee{
    role:UserType
}

export interface HrManager extends BaseManager{
    partners: Employee[]
}

export interface ProjectManager extends BaseManager{
    projects: Project[]
}

export interface DetailManager extends BaseManager{
    partners: Employee[]
    projects: Project[]
}

export interface CreateEmployee{
    login:string
    password:string
    fullName: string
    subdivisionId: number
    positionId: number
    status: boolean
    outOfOfficeBalance: number
}
export interface UpdateEmployee{
    id: number
    login:string
    password:string
    fullName: string
    subdivisionId: number
    positionId: number
    status: boolean
    outOfOfficeBalance: number
    hrManagerId:number
}

export interface CreateManager{
    login:string
    password:string
    fullName: string
}

export interface UpdateManager extends CreateManager{
    id:number
}
