// Create Redux action types
export const SET_ROLES = "SET_ROLES";
export const SET_SELECTED_ROLE = "SET_SELECTED_ROLE";

export const setSelectedRole = (role: string) => ({
    type: SET_SELECTED_ROLE,
    payload: role,
});

export const setRoles = () => ({
    type: SET_ROLES,
    payload: ["Admin", "Registrar"]
});
