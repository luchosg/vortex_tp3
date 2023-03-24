import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE, FETCH_EMPLOYEES, FETCH_EMPLOYEE } from "./types"

export const createEmployee = employee => async dispatch => {
    const response = await fetch('http://localhost:8000/employees', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...employee, cuit: employee.cuit.split('-').join('')})
    });
    const {data} = await response.json();
    dispatch({type: CREATE_EMPLOYEE, payload: data})
}

export const deleteEmployee = id => async dispatch => {
    const response = await fetch(`http://localhost:8000/employees/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(data)
    dispatch({type: DELETE_EMPLOYEE, payload: id});
}

// export const deleteEmployee = id => {
//     return {
//         type: DELETE_EMPLOYEE,
//         payload: id
//     }
// }

export const editEmployee = employee => async dispatch => {
    const response = await fetch(`http://localhost:8000/employees/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...employee, cuit: employee.cuit.split('-').join('')})
    });
    const data = await response.json();
    console.log(data)
    dispatch({type: EDIT_EMPLOYEE, payload: employee});
}

// export const editEmployee = employee => {
//     return {
//         type: EDIT_EMPLOYEE,
//         payload: employee
//     }
// }

export const fetchEmployees = () => async dispatch => {
    const response = await fetch('http://localhost:8000/employees');
    const {data} = await response.json();
    dispatch({type: FETCH_EMPLOYEES, payload: data});
}

export const fetchEmployee = id => async dispatch => {
    const response = await fetch(`http://localhost:8000/employees/${id}`)
    const {data} = await response.json();
    dispatch({type: FETCH_EMPLOYEE, payload: {...data, join_date: data.join_date.split('T')[0]}});
}