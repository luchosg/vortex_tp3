import { combineReducers } from "redux";
import employeesReducer from "./employeesReducer";
import assetsReducer from "./assetsReducer";

export default combineReducers({
    rrhh: employeesReducer,
    resources: assetsReducer
})