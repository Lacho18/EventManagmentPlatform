import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        eventsData: [],
        maxEventsNumber: 0,
        currentPage: 1,
        elementsOnPage: 3,
        orderType: "event_date",
        eventsType: "upcomingEvents"
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
        },
        setEventsType: (state, action) => {
            if (action.payload.type !== state.eventsType) {
                state.eventsType = action.payload.type;
            }
        }
    },
});

export const { getEventsData, setMaxEvents, changePage, setOrderType, setEventsType } = eventsSlice.actions;
export default eventsSlice.reducer; 