import {IStudentDetails} from "../models/IStudentDetails";

export interface IStudentModalProps {
    studentDetails: IStudentDetails | null;
    editable: boolean;
    show:boolean;
    onClose: () => void;
}