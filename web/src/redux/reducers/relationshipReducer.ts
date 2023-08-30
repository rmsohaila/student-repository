import * as actions from "../actions/relationshipActions";

export const initialState = {
    relationships: [],
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
export default function relationshipReducer(state = initialState, action: any) {
    switch (action.type) {
        case actions.GET_RELATIONSHIP_SUCCESS:
            return {
                ...state,
                relationships: action.payload,
            };
        case actions.GET_RELATIONSHIP_FAILURE:
            return { ...state, hasErrors: true };
        default:
            return state;
    }
}
