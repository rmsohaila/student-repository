import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export interface AppState {
    students: any;
    roles: any;
    nationalities: any;
    relationships: any;
    selectedRole: string;
    loading: boolean;
    hasErrors: boolean;
}

export default store;
