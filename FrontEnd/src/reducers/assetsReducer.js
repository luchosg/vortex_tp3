import {FETCH_ASSETS, FETCH_ASSET, DELETE_ASSET, ASSET_ERROR} from "../actions/types";

const initialState = {
    fetched_assets: null,
    fetched_asset: null,
    totalPages: null,
    prevPage: null,
    nextPage: null,
    error: null
}

//Ver que pasa cuando editamos y no estan fetcheados los assets

const assetsReducer = (state = initialState, action) => {
    switch (action.type){
        case DELETE_ASSET:
            return {...state, fetched_assets: state.fetched_assets.filter(asset => asset.id !== action.payload)}
        case ASSET_ERROR:
            return {...state, error: action.payload}
        case FETCH_ASSETS:
            return {
                ...state,
                fetched_assets: action.payload.data,
                totalPages: action.payload.totalPages,
                prevPage: action.payload.prevPage,
                nextPage: action.payload.nextPage
            }     
        case FETCH_ASSET:
            return {...state, fetched_asset: action.payload}
        default:
            return state
    }
}

export default assetsReducer;
