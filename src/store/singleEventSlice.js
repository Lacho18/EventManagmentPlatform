import { createSlice } from '@reduxjs/toolkit';

const singleEventSlice = createSlice({
    name: 'singleEvent',
    initialState: {
        eventData: {}
    },
    reducers: {
        changeSingleEventHandler: (state, action) => {
            state.eventData[action.payload.name] = action.payload.value;
        }
    },
});

export const { changeSingleEventHandler } = singleEventSlice.actions;
export default singleEventSlice.reducer;