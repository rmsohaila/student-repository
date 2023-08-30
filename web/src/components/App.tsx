import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";

import {setRoles, setSelectedRole} from "../redux/actions/roleActions";
import {fetchStudents} from "../redux/actions/studentActions";
import {AppState} from "../redux/store";
import RoleDropdown from "./RoleDropdown";
import StudentTable from "./StudentTable";
import StudentModal from "./StudentModal";
import {IStudentDetails} from "../interfaces/models/IStudentDetails";
import {fetchNationalities} from "../redux/actions/nationalityActions";
import {fetchRelationships} from "../redux/actions/relationshipActions";
import NewStudentModal from "./NewStudentModal";
import {Button} from "react-bootstrap";

interface IAppProps {
    roles: string[];
    selectedRole: string;
}

const App: React.FC<IAppProps> = ({roles, selectedRole}: IAppProps) => {
    const dispatch = useDispatch();
    const [selectedStudent, setSelectedStudent] =
        useState<IStudentDetails | null>(null);
    const [showNewStudent, setShowNewStudent] = useState(false);
    const [showEditedStudent, setShowEditedStudent] = useState(false);

    useEffect(() => {
        dispatch(setRoles());
        // @ts-ignore
        dispatch(fetchNationalities());
        // @ts-ignore
        dispatch(fetchRelationships());
    }, [dispatch]);

    const handleRoleChange = (role: string) => {
        dispatch(setSelectedRole(role));
    };

    const handleStudentClick = (student: IStudentDetails) => {
        setSelectedStudent(student);
        setShowEditedStudent(true);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
    };

    const handleAddNew = () => setShowNewStudent(true);

    return (
        <>
            {/* Header navigation */}
            <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                <div className={"container"}>
                    <a className={"navbar-brand"} href={"#"}><strong>Student Repository Scenario</strong></a>

                    <button className={"navbar-toggler"} type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation"><span
                        className={"navbar-toggler-icon"}></span></button>
                    <div className={"collapse navbar-collapse"} id="navbarSupportedContent">
                        <ul className={"navbar-nav ms-auto mb-2 mb-lg-0"}>
                            <li className={"nav-item text-white pt-3"}><span className={"fw-bold"}
                                                                             style={{paddingRight: "2em"}}>SELECT ROLE: </span>
                            </li>
                            <li className={"nav-item"}>&nbsp;</li>
                            <li className={"nav-item dropdown"}>
                                <RoleDropdown
                                    roles={roles}
                                    selectedRole={selectedRole}
                                    onSelectRole={handleRoleChange}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="container pt-5">
                <div className="row">
                    {/* Add Button Control */}
                    <div className="col-md-12 py-3">
                        <Button onClick={handleAddNew} variant="success">Add New
                            Student</Button>
                    </div>

                    {/* Student Table */}
                    <div className="col-md-12">
                        <StudentTable onStudentClick={handleStudentClick}/>
                    </div>

                    {/* New Record Modal */}
                    {showNewStudent &&
                        <NewStudentModal editable={selectedRole === "Registrar"}
                                         show={showNewStudent}
                                         onClose={() => setShowNewStudent(false)}
                        />
                    }

                    {/* Show Selected Record */}
                    {selectedStudent && (
                        <StudentModal
                            studentDetails={selectedStudent}
                            show={showEditedStudent}
                            editable={selectedRole === "Registrar"}
                            onClose={handleCloseModal}
                        />
                    )}
                </div>
            </div>
        </>

    );
};

const mapStateToProps = (state: AppState) => ({
    roles: state.roles.roles,
    selectedRole: state.roles.selectedRole,
});

export default connect(mapStateToProps)(App);
