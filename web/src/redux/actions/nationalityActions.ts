import { Dispatch } from "redux";
import { INationality } from "../../interfaces/models/INationality";
import { getAllNationalities } from "../../api/nationality";

// Create Redux action types
export const GET_NATIONALITIES_SUCCESS = "GET_NATIONALITIES_SUCCESS";
export const GET_NATIONALITIES_FAILURE = "GET_NATIONALITIES_FAILURE";

export const getNationalitiesSuccess = (nationalities: INationality[]) => ({
    type: GET_NATIONALITIES_SUCCESS,
    payload: nationalities,
});

// Create Redux action creators that return an action
export const getNationalitiesFailure = () => ({
    type: GET_NATIONALITIES_FAILURE,
});

// Combine them all in an asynchronous thunk
export const fetchNationalities = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await getAllNationalities();
            const data: INationality[] = response.data;
            // how to handle errors from api -> 200, 201, 404, 500
            dispatch(getNationalitiesSuccess(data));
        } catch (error: any) {
            dispatch(getNationalitiesFailure());
        }
    };
};
