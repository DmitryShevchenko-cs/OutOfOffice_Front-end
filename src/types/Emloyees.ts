import { Position, Subdivision } from "./selections";

export interface BaseEmployee{
    id: number;
    fullName: string;
    photo: string;
}

export interface Employee extends BaseEmployee {
    subdivision: Subdivision;
    position: Position;
    status: boolean;
    outOfOfficeBalance: number;
    hrManager: HrManager | null;
}

export interface HrManager extends BaseEmployee{

}

export interface ProjectManager extends BaseEmployee{
    
}

