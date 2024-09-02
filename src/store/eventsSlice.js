import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        eventsData: [],
        maxEventsNumber: 0,
        currentPage: 1,
        elementsOnPage: 3,
        orderType: "event_date"
    },
    reducers: {
        getEventsData: (state, actions) => {
            state.eventsData = actions.payload.data;
        },
        setMaxEvents: (state, action) => {
            state.maxEventsNumber = action.payload.totalEvents;
        },
        changePage: (state, action) => {
            state.currentPage = action.payload.selectedPage;
        },
        setOrderType: (state, action) => {
            state.orderType = action.payload.orderType;
        }
    },
});

export const { getEventsData, setMaxEvents, changePage, setOrderType } = eventsSlice.actions;
export default eventsSlice.reducer; 