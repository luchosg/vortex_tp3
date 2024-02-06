import {  
    FETCH_EMPLOYEES, 
    FETCH_EMPLOYEE,
    START_LOADING,
    RESET_MESSAGE,
    RESET_ERROR,
    ADD_FILTER,
    RESET_FILTER 
} from "./types"

const employeesURL = new URL('http://localhost:8000/employees');

export const createEmployee = employee => async dispatch => {
    try{
        const response = await fetch(employeesURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...employee, cuit: employee.cuit.split('-').join('')})
        });
        const data = await response.json();

        dispatch({type: START_LOADING, payload: data.message})
    } catch(e){
        console.log(e);
    }
}

export const deleteEmployee = id => async dispatch => {
    try{
        const response = await fetch(`${employeesURL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        dispatch({type: START_LOADING, payload: data.message});
    } catch(e){
        console.log(e);
    }
}

export const editEmployee = employee => async dispatch => {
    try{
        const response = await fetch(`${employeesURL}/${employee.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });
    
        console.log(response);
    } catch(e) {
        console.log(e);
    }

}

export const fetchEmployees = filterParams => async dispatch => {
    try{
        employeesURL.search = new URLSearchParams(filterParams);
        const response = await fetch(employeesURL);
        employeesURL.search = '';
        if(response.ok){
            const data = await response.json();
            dispatch({type: FETCH_EMPLOYEES, payload: data});
        } else {
            dispatch({type: FETCH_EMPLOYEES, payload: {data: [], totalPages: 0}});
        }
    } catch(e) {
        console.log(e);
    }
}

export const fetchEmployee = id => async dispatch => {
    try{
        const response = await fetch(`${employeesURL}/${id}`)
        if(response.ok){
            const {data} = await response.json();
            dispatch({type: FETCH_EMPLOYEE, payload: {...data, join_date: data.join_date.split('T')[0]}});
        } else {
            dispatch({type: FETCH_EMPLOYEE, payload: null});
        }
    } catch(e){
        console.log(e);
    }   
}

export const startEmployeesLoading = () => {
    return {type: START_LOADING}
}

export const resetMessage = () => {
    return {type: RESET_MESSAGE}
}

export const resetError = () => {
    return {type: RESET_ERROR}
}

export const resetFilter = () => {
    return {type: RESET_FILTER}
}

export const addFilter = filterParams => {
    return {type: ADD_FILTER, payload: filterParams}
}
