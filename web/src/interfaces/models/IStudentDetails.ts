import {IFamilyMember} from "./IFamilyMember";

export interface IStudentDetails {
    ID: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality?: string;
    nationalityId?: number;
    familyMembers?: IFamilyMember[];
    isNew?: boolean;
}