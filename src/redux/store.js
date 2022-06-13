import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from './reducers/userReducer';
import {dataReducer} from './reducers/dataReducer';

let reducer = {
    user: userReducer,
    data: dataReducer
}

let store = configureStore({
    reducer
})

export default store;