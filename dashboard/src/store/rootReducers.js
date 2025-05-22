import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer.js';
import categoryReducer from './Reducers/categoryReducer.js'
import productReducer from './Reducers/productReducer.js'
import sellerReducer from './Reducers/sellerReducer.js'
import orderReducer from './Reducers/orderReducer.js'

export const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    order: orderReducer,
});

export default rootReducer;
