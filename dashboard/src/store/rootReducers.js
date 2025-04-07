import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer.js';

export const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
