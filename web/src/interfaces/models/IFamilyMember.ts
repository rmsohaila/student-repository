export interface IFamilyMember {
    ID: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    relationshipId?: number | null;
    nationalityId?: number | null;
    isNew?:boolean;
    isEditing?:boolean;
}