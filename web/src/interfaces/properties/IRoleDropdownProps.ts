export interface IRoleDropdownProps {
    roles: string[];
    selectedRole: string;
    onSelectRole: (role: string) => void;
}