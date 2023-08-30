import React, {useEffect, useState} from "react";
import {IStudentModalProps} from "../interfaces/properties/IStudentModalProps";
import {IStudentDetails} from "../interfaces/models/IStudentDetails";
import FamilyMemberSection from "./FamilyMemberSection";
import BasicInfoSection from "./StudentBasicInfoSection";
import {IFamilyMember} from "../interfaces/models/IFamilyMember";
import {useDispatch} from "react-redux";
import * as studentApi from "../api/student";
import {fetchStudentNationality, updateStudent} from "../redux/actions/studentActions";
import {Button, Col, Modal, Row} from "react-bootstrap";

const StudentModal: React.FC<IStudentModalProps> = ({
                                                        studentDetails,
                                                        editable,
                                                        show,
                                                        onClose,
                                                    }) => {
        const dispatch = useDispatch();
        const [editedStudent, setEditedStudent] =
            useState<IStudentDetails | null>(
                studentDetails
            );

        useEffect(() => {
                if (editedStudent) {
                    const fetchStudeNationality = async () => {
                        const response = await studentApi.getStudentNationatliy(editedStudent.ID);
                        const nationalityId = response.data.nationalityId;
                        setEditedStudent(prevState => ({
                            ...prevState,
                            nationalityId
                        } as IStudentDetails));
                    };
                    const fetchFamilyMemberNationality = async (member: IFamilyMember) => {
                        try {
                            const response = await studentApi.getFamilyMemberNationality(member.ID);
                            console.log("FM N:", +response.data.nationalityId);
                            return {
                                ...member,
                                isNew: false,
                                isEditing: false,
                                nationalityId: +response.data.nationalityId,
                            };
                        } catch (error) {
                            console.error(error);
                            alert("Error fetching family member nationality...");
                            throw error;
                        }
                    };
                    const fetchFamilyMembers = async () => {
                        try {
                            const response = await studentApi.getStudentFamilyMembers(editedStudent?.ID);
                            const studentFamilyMembers = await Promise.all(response.data.map(
                                (member: IFamilyMember) => fetchFamilyMemberNationality(member)
                            ));

                            setEditedStudent(prevState => ({
                                ...prevState,
                                familyMembers: studentFamilyMembers
                            } as IStudentDetails));

                        } catch (error) {
                            console.error(error);
                            alert("Error fetching family members...");
                        }
                    };

                    fetchStudeNationality();
                    fetchFamilyMembers();
                }
            }, []
        );
        useEffect(() => {
            // @ts-ignore
            dispatch(fetchStudentNationality(editedStudent?.ID));
        }, [dispatch]);

        const handleEditField = (field: keyof IStudentDetails, value: any) => {
            if (editedStudent) {
                setEditedStudent(
                    (prevState) => ({
                        ...prevState,
                        [field]: value,
                    } as IStudentDetails)
                );
            }
        };

        const handleSubmit = () => {
            if (editedStudent) {
                editedStudent.isNew = false;
                console.log(editedStudent);
                // @ts-ignore
                dispatch(updateStudent(editedStudent));
                onClose();
            }
        };

        const allocateFamilyMemberId = (members: any) => (!members ? 1 : members.length + 1);

        const handleAddFamilyMember = () => {
            if (editedStudent) {
                const newFamilyMember: IFamilyMember = {
                    ID: allocateFamilyMemberId(editedStudent.familyMembers),
                    firstName: "",
                    lastName: "",
                    dateOfBirth: "",
                    isNew: true,
                    isEditing: true,
                };

                setEditedStudent(
                    (prevState) =>
                        ({
                            ...prevState,
                            familyMembers: [
                                ...(prevState?.familyMembers || []),
                                newFamilyMember,
                            ],
                        } as IStudentDetails)
                );
            }
        };

        const handleEditFamilyMember = (familyMemberId: number) => {
            if (editedStudent) {
                setEditedStudent(
                    (prevState) => ({
                        ...prevState,
                        familyMembers: prevState?.familyMembers?.map(member => {
                            if (member.ID === familyMemberId) {
                                return {
                                    ...member,
                                    isNew: false,
                                    isEditing: true
                                };
                            }
                            return member;
                        })
                    } as IStudentDetails)
                );
            }
        };

        const handleDeleteFamilyMember = (familyMemberId: number) => {
            // @ts-ignore
            if (window.confirm("Are you sure?") && editedStudent) {
                try {
                    studentApi.deleteFamilyMember(familyMemberId).then((res) => {
                        setEditedStudent((prevStudent) => {
                            if (prevStudent) {
                                const updatedFamilyMembers =
                                    prevStudent.familyMembers?.filter(
                                        (member) => member.ID !== familyMemberId
                                    );

                                return {
                                    ...prevStudent,
                                    familyMembers: updatedFamilyMembers,
                                };
                            }

                            return prevStudent;
                        });
                    });
                } catch (error) {
                    console.error(error);
                    alert("Error fetching family members...");
                }
            }
        };

        const handleEditFamilyMemberField = (
            familyMemberId: number,
            field: keyof IFamilyMember,
            value: string
        ) => {
            if (editedStudent) {
                setEditedStudent((prevStudent) => {
                    if (prevStudent) {
                        const updatedFamilyMembers = prevStudent.familyMembers?.map(
                            (member) => {
                                if (member.ID === familyMemberId) {
                                    return {
                                        ...member,
                                        [field]: value,
                                    };
                                }
                                return member;
                            }
                        );

                        return {
                            ...prevStudent,
                            familyMembers: updatedFamilyMembers,
                        };
                    }

                    return prevStudent;
                });
            }
        };

        return (
            <>
                <Modal
                    size={"xl"}
                    backdrop="static"
                    dialogClassName="modal-90w"
                    show={show}
                    onHide={onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Manage Student Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="py-0">
                        <Row>
                            {/* Basic Information */}
                            <Col sm={"3"} className="py-2">
                                <h5 className={"mb-3"}>Student Information</h5>
                                <BasicInfoSection
                                    student={{
                                        firstName: editedStudent?.firstName || "",
                                        lastName: editedStudent?.lastName || "",
                                        dateOfBirth: editedStudent?.dateOfBirth.substring(0, 10) || "",
                                        nationality: editedStudent?.nationality || "",
                                        nationalityId: editedStudent?.nationalityId || 0,
                                        isNew: false
                                    }}
                                    editable={editable}
                                    onEditField={handleEditField}
                                />
                            </Col>

                            {/* Family Management */}
                            <Col className="pt-2 bg-body-secondary">
                                <Row>
                                    <Col xs={12} md={8}>
                                        <h5 className={"mb-3"}>Family Management</h5>
                                    </Col>
                                    <Col xs={6} md={4} className={"d-flex justify-content-end"}>
                                        {editable && (
                                            <Button onClick={handleAddFamilyMember}>Add Family Member</Button>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="p-2">
                                        <FamilyMemberSection
                                            familyMembers={editedStudent?.familyMembers || []}
                                            editable={editable}
                                            onEditFamilyMemberField={handleEditFamilyMemberField}
                                            onEditFamilyMember={handleEditFamilyMember}
                                            onDeleteFamilyMember={handleDeleteFamilyMember}
                                            onAddFamilyMember={handleAddFamilyMember}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => onClose()}>
                            Close
                        </Button>
                        {editable &&
                            <Button variant="primary" onClick={handleSubmit}>
                                Save
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
;

export default StudentModal;
