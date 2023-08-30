import React from "react";
import {StudentBasicInfoSectionProps} from "../interfaces/properties/IStudentBasicInfoSectionProps";
import {useSelector} from "react-redux";
import {AppState} from "../redux/store";
import {INationality} from "../interfaces/models/INationality";
import {IStudentDetails} from "../interfaces/models/IStudentDetails";
import {FloatingLabel, Form} from "react-bootstrap";

const StudentBasicInfoSection: React.FC<StudentBasicInfoSectionProps> = ({
                                                                             student,
                                                                             editable,
                                                                             onEditField,
                                                                         }) => {
    const nationalities = useSelector(
        (state: AppState) => state.nationalities.nationalities
    );

    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="First Name"
                className="mb-3"
            >
                <Form.Control
                    type="text"
                    id="firstName"
                    placeholder={""}
                    value={student.firstName}
                    onChange={(event) =>
                        onEditField("firstName", event.target.value)
                    }
                    disabled={!editable}
                />
            </FloatingLabel>

            <FloatingLabel
                controlId="floatingInput"
                label="Last Name"
                className="mb-3"
            >
                <Form.Control
                    type="text"
                    id="lastName"
                    placeholder={""}
                    value={student.lastName}
                    onChange={(event) =>
                        onEditField("lastName", event.target.value)
                    }
                    disabled={!editable}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingInput"
                label="Date of Birth"
                className="mb-3"
            >
                <Form.Control
                    type="date"
                    id="dateOfBirth"
                    placeholder={""}
                    value={student.dateOfBirth}
                    onChange={(event) =>
                        onEditField("dateOfBirth", event.target.value)
                    }
                    disabled={!editable}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingInput"
                label="Nationality"
                className="mb-3"
            >
                <Form.Select
                    id="nationality"
                    disabled={!editable}
                    value={student.nationalityId || 0}
                    onChange={(event) =>
                        onEditField("nationalityId", event.target.value)
                    }
                >
                    {nationalities?.map((nationality: INationality) => {
                        return (
                            <option
                                key={nationality.id}
                                value={nationality.id}
                            >
                                {nationality.name}
                            </option>
                        );
                    })}
                </Form.Select>
            </FloatingLabel>
        </>
    );
};

export default StudentBasicInfoSection;
