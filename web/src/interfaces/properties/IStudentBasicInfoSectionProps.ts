import {IStudentDetails} from "../models/IStudentDetails";
import {IStudentBasicInfo} from "../models/IStudentBasicInfo";


export interface StudentBasicInfoSectionProps {
    student: IStudentBasicInfo;
    editable: boolean;
    onEditField: (field: keyof IStudentBasicInfo, value: string) => void;
}