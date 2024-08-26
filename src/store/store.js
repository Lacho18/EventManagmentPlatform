import { configureStore } from '@reduxjs/toolkit';
import clickReducer from './clickSlice';
import userReducer from './userSlice';
import errorReducer from './errorSlice';
import themeColorReducer from './themeColorSlice';

const store = configureStore({
    reducer: {
        click: clickReducer,
        user: userReducer,
        error: errorReducer,
        themeColor: themeColorReducer,
    },
});

export default store;