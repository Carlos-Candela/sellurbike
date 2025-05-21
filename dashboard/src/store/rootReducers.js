import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer.js';
import categoryReducer from './Reducers/categoryReducer.js'
import productReducer from './Reducers/productReducer.js'
import sellerReducer from './Reducers/sellerReducer.js'

export const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
});

export default rootReducer;
