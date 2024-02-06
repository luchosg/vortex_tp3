import {  
    FETCH_ASSETS, 
    FETCH_ASSET, 
} from "./types"

const assetsURL = new URL('http://localhost:8000/assets');

export const fetchAssets = filterParams => async dispatch => {
    try{
        assetsURL.search = new URLSearchParams(filterParams);
        const response = await fetch(assetsURL);
        assetsURL.search = '';
        if(response.ok){
            const data = await response.json();
            dispatch({type: FETCH_ASSETS, payload: data});
        } else {
            dispatch({type: FETCH_ASSETS, payload: {data: [], totalPages: 0, prevPage: null, nextPage: null}});
        }
    } catch(e){
        console.log(e);
    }
}

export const fetchAsset = id => async dispatch => {
    try{
        const response = await fetch(`${assetsURL}/${id}`)
        if(response.ok){
            const {data} = await response.json();
            dispatch({type: FETCH_ASSET, payload: {...data, purchase_date: data.purchase_date.split('T')[0]}});
        } else {
            dispatch({type: FETCH_ASSET, payload: null});
        }
    } catch(e){
        console.log(e);
    }
}

export const createAsset = asset => async dispatch => {
    try{
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
    } catch(e){
        console.log(e);
    }

}

export const editAsset = asset => async dispatch => {
    try{
        const response = await fetch(`${assetsURL}/${asset.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(asset)
        });
    } catch(e){
        console.log(e);
    }
}

export const deleteAsset = id => async dispatch => {
    try{
        const response = await fetch(`${assetsURL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
    } catch(e){
        console.log(e)
    }
}

// export const resetErrorApi = () => {
//     return({
//         type: ASSET_ERROR,
//         payload: null
//     })
// }