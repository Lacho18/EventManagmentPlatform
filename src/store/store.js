import { configureStore } from '@reduxjs/toolkit';
import clickReducer from './clickSlice';
import userReducer from './userSlice';
import errorReducer from './errorSlice';

const store = configureStore({
    reducer: {
        click: clickReducer,
        user: userReducer,
        error: errorReducer,
    },
});

export default store;