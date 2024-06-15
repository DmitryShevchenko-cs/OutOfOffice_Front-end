export interface ILoginData {
  login: string;
  password: string;
  isNeedToRemember: boolean;
}

export interface ICurrentUserModel{
  fullName: string,
  photo: string | null;
}

export interface ICreateUserModel{
  login:string,
  password:string,
  fullName: string;
  photo: File | null;
}

export enum UserType{
  Admin = "Admin",
  HrManager = "HrManager",
  ProjectManager = "ProjectManager",
  Employee = "Employee",
  Role = "Role"
}