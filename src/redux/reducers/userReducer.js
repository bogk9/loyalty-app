import { actionTypes } from "../actions/actionTypes";


const initialState = {
    access_token: "",
    error: "",
    splash: true,
    loading: false, // while waiting for token on log in
    sentOTP: false
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SIGNIN_SUCCESS:
            return {...state, 
                    access_token: action.payload.access_token,
                    error: "",
                    loading: false,
                    sentOTP: false
            }
        case actionTypes.SIGNIN_PROCESSING:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SIGNIN_ERROR:
            return{
                ...state,
                loading:false,
                error: action.payload.error
            }
        case actionTypes.SIGNIN_REQUEST_OTP:
            return{
                ...state,
                loading: true
            }
        case actionTypes.SIGNIN_SENT_OTP:
            return{
                ...state,
                loading: false,
                sentOTP: true
            }
        case actionTypes.LOG_OUT:
            return{
                ...state,
                loading: false,
                access_token: "",
            }
        case actionTypes.CHECK_RENEW_TOKEN:
            return{
                ...state,
                access_token: action.payload,
                splash: false
            }
        case actionTypes.CHECK_SET_STORED_TOKEN:
            return{
                ...state,
                access_token: action.payload.access_token,
                splash: false
            }
        case actionTypes.CHECK_NO_TOKEN:
            return{
                ...state,
                splash: false
            }
        case actionTypes.CHECK_FAILED:
            return{
                ...state,
                error: action.payload.error,
                splash: false
            }
        default:
            return state;
    }
}