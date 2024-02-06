import { START_LOADING, FETCH_EMPLOYEE, FETCH_EMPLOYEES, RESET_MESSAGE, RESET_ERROR, RESET_FILTER, ADD_FILTER } from "../actions/types";

const initialState = {
    fetched_employees: null,
    fetched_employee: null,
    totalPages: null,
    isLoading: true,
    apiMessage: null,
    apiError: null,
    filterParams: {}
}

const employeesReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_EMPLOYEES:
            return {
                ...state,
                fetched_employees: action.payload.data,
                totalPages: action.payload.totalPages,
                isLoading: false
            } 
        case FETCH_EMPLOYEE:
            return {...state, fetched_employee: action.payload, isLoading: false}
        case START_LOADING:
            return {...state, isLoading: true, apiMessage: action.payload}
        case RESET_MESSAGE:
            return {...state, apiMessage: null}
        case RESET_ERROR:
            return {...state, apiError: null}
        case RESET_FILTER:
            return {...state, filterParams:{}}
        case ADD_FILTER:
            return {...state, filterParams:{...state.filterParams, ...action.payload}}
        default:
            return state
    }
}

export default employeesReducer;


