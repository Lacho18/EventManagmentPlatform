import { configureStore } from '@reduxjs/toolkit';
import clickReducer from './clickSlice';
import userReducer from './userSlice';
import errorReducer from './errorSlice';
import themeColorReducer from './themeColorSlice';
import loadingReducer from './loadingSlice';
import eventsReducer from './eventsSlice';
import singleEventReducer from './singleEventSlice';
import chatsReducer from './chatsSlice';

const store = configureStore({
    reducer: {
        click: clickReducer,
        user: userReducer,
        error: errorReducer,
        themeColor: themeColorReducer,
        loading: loadingReducer,
        events: eventsReducer,
        singleEvent: singleEventReducer,
        chats: chatsReducer,
    },
});

export default store;
