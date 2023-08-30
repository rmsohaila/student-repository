import { Dispatch } from "redux";
import { IRelationship } from "../../interfaces/models/IRelationship";
import { getAllRelationships } from "../../api/relationship";

// Create Redux action types
export const GET_RELATIONSHIP_SUCCESS = "GET_RELATIONSHIP_SUCCESS";
export const GET_RELATIONSHIP_FAILURE = "GET_RELATIONSHIP_FAILURE";

export const getRelationshipsSuccess = (relationships: IRelationship[]) => ({
    type: GET_RELATIONSHIP_SUCCESS,
    payload: relationships,
});

// Create Redux action creators that return an action
export const getRelationshipsFailure = () => ({
    type: GET_RELATIONSHIP_FAILURE,
});

// Combine them all in an asynchronous thunk
export const fetchRelationships = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await getAllRelationships();
            const data: IRelationship[] = response.data;
            // how to handle errors from api -> 200, 201, 404, 500
            dispatch(getRelationshipsSuccess(data));
        } catch (error: any) {
            dispatch(getRelationshipsFailure());
        }
    };
};
