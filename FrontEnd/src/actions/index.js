import { 
    CREATE_EMPLOYEE, 
    DELETE_EMPLOYEE, 
    EDIT_EMPLOYEE, 
    FETCH_EMPLOYEES, 
    FETCH_EMPLOYEE, 
    FETCH_ASSETS, 
    FETCH_ASSET,
    CREATE_ASSET,
    EDIT_ASSET,
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
    const {data} = await response.json();
    dispatch({type: CREATE_EMPLOYEE, payload: data})
}

export const deleteEmployee = id => async dispatch => {
    const response = await fetch(`${employeesURL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(data);
    dispatch({type: DELETE_EMPLOYEE, payload: id});
}

export const editEmployee = employee => async dispatch => {
    const response = await fetch(`${employeesURL}/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...employee, cuit: employee.cuit.split('-').join('')})
    });
    const data = await response.json();
    console.log(data);
    dispatch({type: EDIT_EMPLOYEE, payload: employee});
}

export const fetchEmployees = filterParams => async dispatch => {
        employeesURL.search = new URLSearchParams(filterParams);
        const response = await fetch(employeesURL);
        if(response.ok){
            const data = await response.json();
            dispatch({type: FETCH_EMPLOYEES, payload: data});
            // const data = await response.json();
            // dispatch({type: FETCH_EMPLOYEES, payload: data});
        } else {
            dispatch({type: FETCH_EMPLOYEES, payload: []});
        }
}

export const fetchEmployee = id => async dispatch => {
    const response = await fetch(`${employeesURL}/${id}`)
    const {data} = await response.json();
    dispatch({type: FETCH_EMPLOYEE, payload: {...data, join_date: data.join_date.split('T')[0]}});
}

export const fetchAssets = filterParams => async dispatch => {
    assetsURL.search = new URLSearchParams(filterParams);
    const response = await fetch(assetsURL);
    if(response.ok){
        const {data} = await response.json();
        dispatch({type: FETCH_ASSETS, payload: data});
    } else {
        dispatch({type: FETCH_ASSETS, payload: []});
    }
}

export const fetchAsset = id => async dispatch => {
    const response = await fetch(`${assetsURL}/${id}`)
    const {data} = await response.json();
    dispatch({type: FETCH_ASSET, payload: {...data, purchase_date: data.purchase_date.split('T')[0]}});
}

export const createAsset = asset => async dispatch => {
    const response = await fetch(assetsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(asset)
    });
    const {data} = await response.json();
    dispatch({type: CREATE_ASSET, payload: data})
}

export const editAsset = asset => async dispatch => {
    const response = await fetch(`${assetsURL}/${asset.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(asset)
    });
    const data = await response.json();
    console.log(data);
    dispatch({type: EDIT_ASSET, payload: asset});
}

export const deleteAsset = id => async dispatch => {
    const response = await fetch(`${assetsURL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(data);
    dispatch({type: DELETE_ASSET, payload: id});
}