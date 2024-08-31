import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        eventsData: [],
        maxEventsNumber: 0,
        currentPage: 1
    },
    reducers: {
        getEventsData: (state, actions) => {
            state.eventsData = actions.payload.data;
        }
    },
});

export const { getEventsData } = eventsSlice.actions;
export default eventsSlice.reducer; 