import React, {useState} from "react";
import {INewStudentModalProps} from "../interfaces/properties/INewStudentModalProps";
import StudentBasicInfoSection from "./StudentBasicInfoSection";
import {IStudentDetails} from "../interfaces/models/IStudentDetails";
import {IStudentBasicInfo} from "../interfaces/models/IStudentBasicInfo";
import {useDispatch} from "react-redux";
import {createStudent} from "../redux/actions/studentActions";
import {Button, Modal} from "react-bootstrap";
import {AppState} from "../redux/store";

const NewStudentModal: React.FC<INewStudentModalProps> = ({
                                                              editable,
                                                              show,
                                                              onClose,
                                                          }) => {
    const dispatch = useDispatch();
    // const isSuccess = useSelector((state: AppState) => state.students.getStudents);

    const [newStudent, setNewStudent]
        = useState<IStudentBasicInfo>({
        firstName: "",
        lastName: "",
        nationality: "",
        dateOfBirth: "",
        isNew: true
    });

    const handleEditField = (field: keyof IStudentDetails, value: any) => {
        setNewStudent(
            (prevStudent) =>
                ({
                    ...prevStudent,
                    [field]: value,
                } as IStudentBasicInfo)
        );
    }

    const handleSubmit = () => {
        // @ts-ignore
        dispatch(createStudent(newStudent));
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StudentBasicInfoSection
                    student={newStudent}
                    editable={true}
                    onEditField={handleEditField}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewStudentModal;