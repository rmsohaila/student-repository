import {IFamilyMember} from "../models/IFamilyMember";

export interface IFamilyMemberSectionProps {
    familyMembers: IFamilyMember[];
    editable: boolean;
    onEditFamilyMemberField: (familyMemberId: number, field: keyof IFamilyMember, value: string) => void;
    onDeleteFamilyMember: (familyMemberId: number) => void;
    onEditFamilyMember: (familyMemberId: number) => any;
    onAddFamilyMember: () => void;
}
