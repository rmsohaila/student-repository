import * as actions from "../actions/roleActions";

export const initialState = {
    selectedRole: "",
    roles: [],
    loading: false,
    hasErrors: false,
};

/**
 * Reduces the state based on the given action.
 *
 * @param {Object} state - The current state.
 * @param {Object} action - The action object.
 * 
 * @return {Object} The updated state.
 */
export default function roleReducer(state = initialState, action: any) {
    switch (action.type) {
        case actions.SET_SELECTED_ROLE:
            return {
                ...state,
                selectedRole: action.payload
            };
        case actions.SET_ROLES:
            return {
                ...state,
                roles: action.payload
            };
        default:
            return state;
    }
}
