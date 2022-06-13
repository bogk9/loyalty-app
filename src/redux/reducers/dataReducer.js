import { actionTypes } from "../actions/actionTypes"

const initialState = {
    points: -1,
    username: "",
    loading: false,
    error: ""
}

export const dataReducer = (state=initialState, action) => {

    switch(action.type){
        case actionTypes.FETCH_PROCESSING:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                username: action.payload.username,
                points: action.payload.points,
                orders: action.payload.orders
            }
        case actionTypes.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: "Error!"
            }
        default:
            return {
                ...state
            }
    }
}