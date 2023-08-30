import React from 'react';
import {useSelector} from 'react-redux';
import {IRoleDropdownProps} from '../interfaces/properties/IRoleDropdownProps';
import {AppState} from '../redux/store';
import {IRole} from '../interfaces/models/IRole';
import {Form} from "react-bootstrap";

const RoleDropdown: React.FC<IRoleDropdownProps> = ({roles, selectedRole, onSelectRole}) => {

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectRole(event.target.value);
    };

    return (
        <Form.Select size="lg" value={selectedRole} onChange={handleRoleChange}>
            {roles.map(role => (
                <option key={role} value={role}>
                    {role}
                </option>
            ))}
        </Form.Select>
    );
};

export default RoleDropdown;
