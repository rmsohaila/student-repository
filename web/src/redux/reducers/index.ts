import { combineReducers } from "redux";

import studentReducer from "./studentReducer";
import roleReducer from "./roleReducer";
import nationalityReducer from "./nationalityReducer";
import relationshipReducer from "./relationshipReducer";

const rootReducer = combineReducers({
    roles: roleReducer,
    students: studentReducer,
    relationships: relationshipReducer,
    nationalities: nationalityReducer,
});

export default rootReducer;
