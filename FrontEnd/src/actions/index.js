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
    console.log(data);
    dispatch({type: DELETE_EMPLOYEE, payload: id});
}

export const editEmployee = employee => async dispatch => {
    const response = await fetch(`http://localhost:8000/employees/${employee.id}`, {
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

export const fetchAssets = () => async dispatch => {
    const response = await fetch('http://localhost:8000/assets');
    const {data} = await response.json();
    dispatch({type: FETCH_ASSETS, payload: data});
}

export const fetchAsset = id => async dispatch => {
    const response = await fetch(`http://localhost:8000/assets/${id}`)
    const {data} = await response.json();
    dispatch({type: FETCH_ASSET, payload: {...data, purchase_date: data.purchase_date.split('T')[0]}});
}

export const createAsset = asset => async dispatch => {
    const response = await fetch('http://localhost:8000/assets', {
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
    const response = await fetch(`http://localhost:8000/assets/${asset.id}`, {
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
    const response = await fetch(`http://localhost:8000/assets/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(data);
    dispatch({type: DELETE_ASSET, payload: id});
}