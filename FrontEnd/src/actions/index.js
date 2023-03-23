import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE, FETCH_EMPLOYEES } from "./types"

export const createEmployee = employee => {
    return {
        type: CREATE_EMPLOYEE,
        payload: employee
    }
}

export const deleteEmployee = id => {
    return {
        type: DELETE_EMPLOYEE,
        payload: id
    }
}

export const editEmployee = employee => {
    return {
        type: EDIT_EMPLOYEE,
        payload: employee
    }
}

export const fetchEmployees = () => async dispatch => {
    const response = await fetch('http://localhost:8000/employees');
    const {data} = await response.json();
    console.log(data);
    dispatch({type: FETCH_EMPLOYEES, payload: data})
}