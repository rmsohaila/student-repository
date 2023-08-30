import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../redux/store";
import {IStudentDetails} from "../interfaces/models/IStudentDetails";
import {fetchStudents} from "../redux/actions/studentActions";
import {Table} from "react-bootstrap";

interface StudentTableProps {
    onStudentClick: (student: IStudentDetails) => void;
}

// @ts-ignore
const StudentTable: React.FC<StudentTableProps> = ({onStudentClick}) => {
    const dispatch = useDispatch();
    const students = useSelector((state: AppState) => state.students.students);
    const loading = useSelector((state: AppState) => state.students.loading);
    const error = useSelector((state: AppState) => state.students.error);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchStudents());
    }, [dispatch]);

    if (loading === "pending") {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Table striped hover width={"100%"}>
            <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
            </tr>
            </thead>
            <tbody>
            {students?.map((student: IStudentDetails) => (
                <tr
                    key={student.ID}
                    onClick={() => onStudentClick(student)}
                >
                    <td>{student.ID}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.dateOfBirth.substring(0, 10)}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default StudentTable;
