import React from "react";
import {IFamilyMember} from "../interfaces/models/IFamilyMember";
import {IFamilyMemberSectionProps} from "../interfaces/properties/FamilyMemberSectionProps";
import {AppState} from "../redux/store";
import {useSelector} from "react-redux";
import {INationality} from "../interfaces/models/INationality";
import {IRelationship} from "../interfaces/models/IRelationship";
import {Button, Card, Col, FloatingLabel, Form, Row, Stack} from "react-bootstrap";

const FamilyMemberSection: React.FC<IFamilyMemberSectionProps> = ({
                                                                      familyMembers,
                                                                      editable,
                                                                      onEditFamilyMemberField,
                                                                      onEditFamilyMember,
                                                                      onDeleteFamilyMember,
                                                                      onAddFamilyMember,
                                                                  }) => {
    const relationships = useSelector(
        (state: AppState) => state.relationships.relationships
    );
    const nationalities = useSelector(
        (state: AppState) => state.nationalities.nationalities
    );

    return (
        <Stack direction="horizontal" gap={3}>
            {familyMembers.map((familyMember: IFamilyMember, i) => {
                if (familyMember.isEditing) {
                    return (
                        <Card key={`edit_${familyMember.ID}`}>
                            <Card.Header>New Family Member</Card.Header>
                            <Card.Body>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    id={`firstName-${familyMember.ID}`}
                                    value={familyMember.firstName}
                                    onChange={(event) =>
                                        onEditFamilyMemberField(
                                            familyMember.ID,
                                            "firstName",
                                            event.target.value
                                        )
                                    }
                                    disabled={!editable}
                                />

                                <Form.Control
                                    type="text"
                                    className="mt-2"
                                    placeholder="Last Name"
                                    id={`lastName-${familyMember.ID}`}
                                    value={familyMember.lastName}
                                    onChange={(event) =>
                                        onEditFamilyMemberField(
                                            familyMember.ID,
                                            "lastName",
                                            event.target.value
                                        )
                                    }
                                    disabled={!editable}
                                />

                                <Form.Control
                                    type="date"
                                    className="mt-2"
                                    placeholder="Date of Birth"
                                    id={`dateOfBirth-${familyMember.ID}`}
                                    value={familyMember.dateOfBirth.substring(0, 10)}
                                    onChange={(event) =>
                                        onEditFamilyMemberField(
                                            familyMember.ID,
                                            "dateOfBirth",
                                            event.target.value
                                        )
                                    }
                                    disabled={!editable}
                                />

                                <Form.Select
                                    id={`relationshipId-${familyMember.ID}`}
                                    className="mt-2"
                                    value={familyMember.relationshipId ?? 0}
                                    onChange={(event) =>
                                        onEditFamilyMemberField(
                                            familyMember.ID,
                                            "relationshipId",
                                            event.target.value
                                        )
                                    }
                                    disabled={!editable}
                                >
                                    <option value={0}>--SELECT--</option>
                                    {relationships?.map(
                                        (relationship: IRelationship) => {
                                            return (
                                                <option
                                                    key={relationship.id}
                                                    value={relationship.id}
                                                >
                                                    {relationship.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </Form.Select>

                                <Form.Select
                                    id={`nationalityId-${familyMember.ID}`}
                                    className="mt-2"
                                    value={familyMember.nationalityId ?? 0}
                                    onChange={(event) =>
                                        onEditFamilyMemberField(
                                            familyMember.ID,
                                            "nationalityId",
                                            event.target.value
                                        )
                                    }
                                    disabled={!editable}
                                >
                                    <option value={0}>--SELECT--</option>
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
                            </Card.Body>
                            <Card.Footer>
                                {editable && (
                                    <div>
                                        {
                                            !familyMember.isEditing &&
                                            <Button
                                                onClick={() => onEditFamilyMember(familyMember.ID)}>Edit</Button>
                                        }
                                        <Button variant={"danger"}
                                                onClick={() =>
                                                    onDeleteFamilyMember(familyMember.ID)
                                                }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </Card.Footer>
                        </Card>
                    )
                } else {
                    return (
                        <Card key={`show_${familyMember.ID}`}>
                            <Card.Body>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={6}>First Name:</Form.Label>
                                    <Form.Label column sm={6}>{familyMember.firstName}</Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={6}>Last Name:</Form.Label>
                                    <Form.Label column sm={6}>{familyMember.lastName}</Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={6}>Date of Birth:</Form.Label>
                                    <Form.Label column sm={6}>{familyMember.dateOfBirth?.substring(0, 10)}</Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={6}>Relationship:</Form.Label>
                                    <Form.Label column
                                                sm={6}>{relationships.find((e: any) => e.id == familyMember.relationshipId)?.name}</Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={6}>Nationality:</Form.Label>
                                    <Form.Label column
                                                sm={6}>{nationalities.find((e: any) => e.id == familyMember.nationalityId)?.name}</Form.Label>
                                </Form.Group>
                            </Card.Body>
                            <Card.Footer>
                                {editable && (
                                    <div>
                                        {
                                            !familyMember.isEditing &&
                                            <Button className="mr-2"
                                                onClick={() => onEditFamilyMember(familyMember.ID)}>Edit</Button>
                                        }
                                        <Button variant={"danger"}
                                                onClick={() =>
                                                    onDeleteFamilyMember(familyMember.ID)
                                                }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </Card.Footer>
                        </Card>
                    )
                }
            })}
        </Stack>
    );
};

export default FamilyMemberSection;
