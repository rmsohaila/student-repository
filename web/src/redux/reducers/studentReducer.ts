import * as actions from "../actions/studentActions";
import {IAppStudentState} from "../types";
import {CREATE_NEW_STUDENT} from "../actions/studentActions";
import {IStudentDetails} from "../../interfaces/models/IStudentDetails";

export const initialState: IAppStudentState = {
    students: [],
    loading: false,
    hasErrors: false,
};

/**
 * Reduces the state based on the given action.
 *
 * @param {Object} state - The current state.
 * @param {Object} action - The action object.
 * @return {Object} The updated state.
 */
export default function studentReducer(state = initialState, action: any) {
    switch (action.type) {
        case actions.GET_STUDENTS:
            return {...state, loading: true};
        case actions.GET_STUDENTS_SUCCESS:
            return {
                students: action.payload,
                loading: false,
                hasErrors: false,
            };
        case actions.GET_STUDENTS_FAILURE:
            return {...state, loading: false, hasErrors: true};
        case actions.CREATE_NEW_STUDENT:
            return {
                ...state,
                students: [...state.students, action.payload],
            };
        case actions.UPDATE_STUDENT_NATIONALITY: {
            const {studentId, nationalityId} = action.payload;

            const updatedStudents = state.students.map(student => {
                if (student.ID === studentId) {
                    return {
                        ...student,
                        nationalityId: nationalityId,
                    };
                }
                return student;
            });

            return {
                ...state,
                students: updatedStudents,
            };
        }
        case actions.UPDATE_STUDENT: {
            const _student = action.payload;

            const updatedStudents = state.students.map(student => {
                if (student.ID === _student.ID) {
                    return {
                        ...student,
                        firstName: _student.firstName,
                        lastName: _student.lastName,
                        dateOfBirth: _student.dateOfBirth
                    };
                }
                return student;
            });

            return {
                ...state,
                students: updatedStudents,
            };
        }
        default:
            return state;
    }
}
