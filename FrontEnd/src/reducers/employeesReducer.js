import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE, FETCH_EMPLOYEE, FETCH_EMPLOYEES } from "../actions/types";

const initialState = {
    fetched_employees: null,
    fetched_employee: null
}

const employeesReducer = (state = initialState, action) => {
    switch (action.type){
        case CREATE_EMPLOYEE:
            return {...state, fetched_employees: [...state.fetched_employees, action.payload]}
        case DELETE_EMPLOYEE:
            return {...state, fetched_employees: state.fetched_employees.filter(employee => employee.id !== action.payload)}
        case EDIT_EMPLOYEE:
            return {...state, fetched_employees: state.fetched_employees.map(
                employee => employee.id === action.payload.id  ? action.payload : employee)}
        case FETCH_EMPLOYEES:
            return {...state, fetched_employees: action.payload}
        case FETCH_EMPLOYEE:
            return {...state, fetched_employee: action.payload}
        default:
            return state
    }
}

export default employeesReducer;


