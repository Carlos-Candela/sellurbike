import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducers';

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        });
    },
    devTools: true
});
