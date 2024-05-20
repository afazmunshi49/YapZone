import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from './reducers/authReducers';
import alertReducer from "./reducers/AlertReducer";
import friendsReducer from './reducers/friendsReducer'
import chatReducer from "./reducers/chatReducer";

const rootReducer = {
    auth: authReducer,
    alert: alertReducer,
    friends: friendsReducer,
    chat: chatReducer
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;