import { createSlice } from '@reduxjs/toolkit';

const singleEventSlice = createSlice({
    name: 'singleEvent',
    initialState: {
        eventData: {
            name: "",
            description: "",
            location: {
                country: "",
                town: "",
                location: ""
            },
            duration: "",
            price: 0,
            organizer_ID: 0,
            image: [""],
            event_date: new Date,
            places: 0
        }
    },
    reducers: {
        changeSingleEventHandler: (state, action) => {
            console.log(action.payload.index);
            //If the inserted data is for array and it has to be specialized
            if (Array.isArray(state.eventData[action.payload.name]) && action.payload.index !== -1) {
                state.eventData[action.payload.name][action.payload.index] = action.payload.value;
            }
            else {
                state.eventData[action.payload.name] = action.payload.value;
            }
        }
    },
});

export const { changeSingleEventHandler } = singleEventSlice.actions;
export default singleEventSlice.reducer;