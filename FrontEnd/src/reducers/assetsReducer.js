// import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE, FETCH_EMPLOYEE, FETCH_EMPLOYEES } from "../actions/types";
import {FETCH_ASSETS, FETCH_ASSET} from "../actions/types";

const initialState = {
    fetched_assets: null,
    fetched_asset: null
}

const assetsReducer = (state = initialState, action) => {
    switch (action.type){
        // case CREATE_EMPLOYEE:
        //     return {...state, fetched_employees: [...state.fetched_employees, action.payload]}
        // case DELETE_EMPLOYEE:
        //     return {...state, fetched_employees: state.fetched_employees.filter(employee => employee.id !== action.payload)}
        // case EDIT_EMPLOYEE:
        //     return {...state, fetched_employees: state.fetched_employees.map(
        //         employee => employee.id === action.payload.id  ? action.payload : employee)}
        case FETCH_ASSETS:
            return {...state, fetched_assets: action.payload}
        case FETCH_ASSET:
            return {...state, fetched_asset: action.payload}
        default:
            return state
    }
}

export default assetsReducer;
