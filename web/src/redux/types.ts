import { IStudentDetails } from "../interfaces/models/IStudentDetails";

export interface IAppStudentState {
    students: IStudentDetails[];
    loading: boolean;
    hasErrors: boolean;
}
