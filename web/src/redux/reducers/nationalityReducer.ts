import * as actions from "../actions/nationalityActions";

export const initialState = {
    nationalities: [],
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
export default function nationalityReducer(state = initialState, action: any) {
    switch (action.type) {
        case actions.GET_NATIONALITIES_SUCCESS:
            return {
                ...state,
                nationalities: action.payload,
            };
        case actions.GET_NATIONALITIES_FAILURE:
            return { ...state, hasErrors: true };
        default:
            return state;
    }
}
