import { Project } from "./Project";
import { UserType } from "./User";
import { Position, Subdivision } from "./selections";

export interface BaseEmployee{
    id: number
    fullName: string
    photo: string
}

export interface Employee extends BaseEmployee {
    subdivision: Subdivision
    position: Position
    status: boolean
    outOfOfficeBalance: number
    hrManager: BaseManager | null
}

export interface BaseManager extends BaseEmployee{
    role:UserType
}

export interface HrManager extends BaseManager{
    Partners: Employee[]
}

export interface ProjectManager extends BaseManager{
    Projects: Project[]
}

