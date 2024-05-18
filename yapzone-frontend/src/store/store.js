// import { composeWithDevTools } from "redux-devtools-extension";
// import { combineReducers,  applyMiddleware } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";

// import authReducer from './reducers/authReducers';

// const rootReducer = combineReducers({
//     auth: authReducer,
// });

// const store = configureStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";  // Correct the import to ensure default export is used
import authReducer from './reducers/authReducers';
import alertReducer from "./reducers/AlertReducer";
import friendsReducer from './reducers/friendsReducer'

const rootReducer = {
    auth: authReducer,
    alert: alertReducer,
    friends: friendsReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production' // This is optional since Redux Toolkit enables DevTools by default in development
});

export default store;