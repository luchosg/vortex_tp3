import {  
    DELETE_EMPLOYEE, 
    FETCH_EMPLOYEES, 
    FETCH_EMPLOYEE, 
    FETCH_ASSETS, 
    FETCH_ASSET,
    ASSET_ERROR,
    DELETE_ASSET 
} from "./types"

const employeesURL = new URL('http://localhost:8000/employees');
const assetsURL = new URL('http://localhost:8000/assets');

export const createEmployee = employee => async dispatch => {
    const response = await fetch(employeesURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...employee, cuit: employee.cuit.split('-').join('')})
    });
}

export const deleteEmployee = id => async dispatch => {
    const response = await fetch(`${employeesURL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    // dispatch({type: DELETE_EMPLOYEE, payload: id});
}

export const editEmployee = employee => async dispatch => {
    const response = await fetch(`${employeesURL}/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });
}

export const fetchEmployees = filterParams => async dispatch => {
    employeesURL.search = new URLSearchParams(filterParams);
    const response = await fetch(employeesURL);
    employeesURL.search = '';
    if(response.ok){
        const data = await response.json();
        dispatch({type: FETCH_EMPLOYEES, payload: data});
    } else {
        dispatch({type: FETCH_EMPLOYEES, payload: {data: [], totalPages: 0, prevPage: null, nextPage: null}});
    }
}

export const fetchEmployee = id => async dispatch => {
    const response = await fetch(`${employeesURL}/${id}`)
    if(response.ok){
        const {data} = await response.json();
        dispatch({type: FETCH_EMPLOYEE, payload: {...data, join_date: data.join_date.split('T')[0]}});
    } else {
        dispatch({type: FETCH_EMPLOYEE, payload: null});
    }
    
}

export const fetchAssets = filterParams => async dispatch => {
    assetsURL.search = new URLSearchParams(filterParams);
    const response = await fetch(assetsURL);
    assetsURL.search = '';
    if(response.ok){
        const data = await response.json();
        dispatch({type: FETCH_ASSETS, payload: data});
    } else {
        dispatch({type: FETCH_ASSETS, payload: {data: [], totalPages: 0, prevPage: null, nextPage: null}});
    }
}

export const fetchAsset = id => async dispatch => {
    const response = await fetch(`${assetsURL}/${id}`)
    if(response.ok){
        const {data} = await response.json();
        dispatch({type: FETCH_ASSET, payload: {...data, purchase_date: data.purchase_date.split('T')[0]}});
    } else {
        dispatch({type: FETCH_ASSET, payload: null});
    }
}

export const createAsset = asset => async dispatch => {
    const response = await fetch(assetsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(asset)
    });
    if(!response.ok){
        const {error} = await response.json();
        dispatch({type: ASSET_ERROR, payload: error});
    }
}

export const editAsset = asset => async dispatch => {
    const response = await fetch(`${assetsURL}/${asset.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(asset)
    });
}

export const deleteAsset = id => async dispatch => {
    const response = await fetch(`${assetsURL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    dispatch({type: DELETE_ASSET, payload: id});
}

export const resetErrorApi = () => {
    return({
        type: ASSET_ERROR,
        payload: null
    })
}