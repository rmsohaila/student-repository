import {Dispatch} from "redux";
import * as studentApi from "../../api/student";
import {IStudentDetails} from "../../interfaces/models/IStudentDetails";
import {IStudentBasicInfo} from "../../interfaces/models/IStudentBasicInfo";
import {useDispatch} from "react-redux";
import {IFamilyMember} from "../../interfaces/models/IFamilyMember";

// Create Redux action types
export const GET_STUDENTS = "GET_STUDENTS";
export const CREATE_NEW_STUDENT = "CREATE_NEW_STUDENT";
export const GET_STUDENTS_SUCCESS = "GET_STUDENTS_SUCCESS";
export const GET_STUDENTS_FAILURE = "GET_STUDENTS_FAILURE";
export const UPDATE_STUDENT_NATIONALITY = "UPDATE_STUDENT_NATIONALITY";

export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const CREATE_NEW_FAMILY_MEMBER = "CREATE_NEW_FAMILY_MEMBER";
export const UPDATE_FAMILY_MEMBER = "UPDATE_FAMILY_MEMBER";
export const UPDATE_FAMILY_MEMBER_NATIONALITY = "UPDATE_FAMILY_MEMBER_NATIONALITY";

// Create Redux action creators that return an action
const getStudents = () => ({
    type: GET_STUDENTS,
});

const getStudentsSuccess = (students: IStudentDetails[]) => ({
    type: GET_STUDENTS_SUCCESS,
    payload: students,
});

const getStudentsFailure = () => ({
    type: GET_STUDENTS_FAILURE,
});

const setStudent = (student: IStudentDetails) => ({
    type: CREATE_NEW_STUDENT,
    payload: student
});

const setStudentNationatliyId = (studentId: number, nationalityId: number) => ({
    type: UPDATE_STUDENT_NATIONALITY,
    payload: {studentId, nationalityId}
});

const updateStudentStore = (student: IStudentDetails) => ({
    type: UPDATE_STUDENT,
    payload: student
});

const createFamilyMemberStore = (student: IStudentDetails) => ({
    type: CREATE_NEW_FAMILY_MEMBER,
    payload: student.familyMembers
});

// Combine them all in an asynchronous thunk
export const fetchStudents = () => {
    return async (dispatch: Dispatch) => {
        dispatch(getStudents());
        try {
            const response = await studentApi.getAllStudents();
            const data: IStudentDetails[] = response.data;
            // how to handle errors from api -> 200, 201, 404, 500
            dispatch(getStudentsSuccess(data));
        } catch (error: any) {
            dispatch(getStudentsFailure());
        }
    };
};

export const fetchStudentNationality = (id: number) => {
    return async (dispatch: Dispatch) => {
        const response = await studentApi.getStudentNationatliy(id);
        const nationalityId = response.data.nationalityId;
        dispatch(setStudentNationatliyId(id, nationalityId));
    };
};

export const createStudent = (student: IStudentBasicInfo) => {
    return async (dispatch: Dispatch) => {
        dispatch(getStudents());
        try {
            let response = await studentApi.addStudent({
                firstName: student.firstName,
                lastName: student.lastName,
                dateOfBirth: student.dateOfBirth
            });
            let newStudent = response.data;

            response = await studentApi.updateStudentNationality(newStudent.ID, <number>student.nationalityId);
            newStudent = {...newStudent, nationalityId: response.data.nationalityId};

            dispatch(setStudent(newStudent));
        } catch (error: any) {
            console.log(error);
            dispatch(getStudentsFailure());
        }
    };
};

export const updateStudent = (student: IStudentDetails) => {
    return async (dispatch: Dispatch) => {
        dispatch(getStudents());
        try {
            // 1. Update student basic info
            let response = await studentApi.updateStudentBasicDetails(student.ID, {
                ID: student.ID,
                firstName: student.firstName,
                lastName: student.lastName,
                dateOfBirth: student.dateOfBirth
            });
            let updatedStudent = response.data;

            // 2. Update student nationality
            response = await studentApi.updateStudentNationality(updatedStudent.ID, <number>student.nationalityId);
            updatedStudent = {...updatedStudent, nationalityId: response.data.nationalityId};

            console.log("student nationality updated")

            // if (student.familyMembers?.length) {
            //     const members = student.familyMembers;
            //
            //     for (let i = 0; i < members.length; i++) {
            //         if (members[i].isNew) {
            //             response = await studentApi.addNewFamilyMember(student.ID, members[i]);
            //             const newMember = response.data;
            //
            //             if (members[i].nationalityId) {
            //                 response = await studentApi.updateFamilyMemberNationality(
            //                     newMember.ID, <number>members[i]?.nationalityId);
            //             }
            //
            //         } else {
            //             if (members[i].isEditing) {
            //                 response = await studentApi.updateFamilyMember(members[i]);
            //                 const updatedMember = response.data;
            //                 if (members[i].nationalityId) {
            //                     console.log('going for FMNUpdate: ', members[i]);
            //
            //                     response = await studentApi.updateFamilyMemberNationality(
            //                         updatedMember.ID, <number>members[i]?.nationalityId);
            //                 }
            //             }
            //         }
            //     }
            // }

            if (student.familyMembers?.length) {
                const members = student.familyMembers;

                const promises = members.map(async member => {
                    if (member.isNew) {
                        console.log("ISNEW: sending addNewFM");
                        const response = await studentApi.addNewFamilyMember(student.ID, member);
                        const newMember = response.data;
                        console.log("ISNEW: addNewFM complete");

                        if (member.nationalityId) {
                            console.log("ISNEW: sending Nationality update FM");
                            await studentApi.updateFamilyMemberNationality(newMember.ID, member.nationalityId);
                            console.log("ISNEW: Nationality update Complete");
                        }
                    } else if (member.isEditing) {
                        console.log("ISEDITING: sending updateFM", member);
                        const response = await studentApi.updateFamilyMember(member);
                        const updatedMember = response.data;
                        console.log("ISEDITING:updateFM complete");

                        if (member.nationalityId) {
                            console.log("ISEDITING: sending update Nationality", member);
                            await studentApi.updateFamilyMemberNationality(updatedMember.ID, member.nationalityId);
                            console.log("ISEDITING: Nationality update Complete");
                        }
                    }
                });

                console.log("promises compiled");
                await Promise.all(promises);
                console.log("Promises executed");
            } else {
                console.log("No FMembers");
            }

            dispatch(setStudentNationatliyId(updatedStudent.ID, updatedStudent.nationalityId));
            dispatch(updateStudentStore(updatedStudent));
        } catch
            (error: any) {
            console.log(error);
            dispatch(getStudentsFailure());
        }
    };
};