import { configureStore } from '@reduxjs/toolkit';
import clickReducer from './clickSlice';

const store = configureStore({
    reducer: {
        click: clickReducer,
    },
});

export default store;