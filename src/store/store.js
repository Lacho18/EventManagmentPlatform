import { configureStore } from '@reduxjs/toolkit';
import clickReducer from './clickSlice';
import userReducer from './userSlice';
import errorReducer from './errorSlice';
import themeColorReducer from './themeColorSlice';
import loadingReducer from './loadingSlice';
import eventsReducer from './eventsSlice';

const store = configureStore({
    reducer: {
        click: clickReducer,
        user: userReducer,
        error: errorReducer,
        themeColor: themeColorReducer,
        loading: loadingReducer,
        events: eventsReducer,
    },
});

export default store;