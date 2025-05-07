import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer.js';
import categoryReducer from './Reducers/categoryReducer.js'

export const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoryReducer,
});

export default rootReducer;
