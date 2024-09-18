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
                address: ""
            },
            duration: "",
            price: 0,
            organizer_ID: 0,
            image: [""],
            event_date: null,
            places: 0
        }
    },
    reducers: {
        changeSingleEventHandler: (state, action) => {
            console.log(action.payload.name);
            //If the inserted data is for array and it has to be specialized
            if (Array.isArray(state.eventData[action.payload.name]) && action.payload.index !== -1) {
                state.eventData[action.payload.name][action.payload.index] = action.payload.value;
            }
            //If the inserted data is for object, the name comes as (field.subField) (example - location.town)
            else if (action.payload.name.includes('.')) {
                let properties = action.payload.name.split('.');
                state.eventData[properties[0]][properties[1]] = action.payload.value;
            }
            else {
                state.eventData[action.payload.name] = action.payload.value;
            }
        },

        clearSingleEventState: (state) => {
            state.eventData = {
                name: "",
                description: "",
                location: {
                    country: "",
                    town: "",
                    address: ""
                },
                duration: "",
                price: 0,
                organizer_ID: 0,
                image: [""],
                event_date: null,
                places: 0
            }
        },

        setEventHandler: (state, action) => {
            state.eventData = action.payload;
        }
    },
});

export const { changeSingleEventHandler, clearSingleEventState, setEventHandler } = singleEventSlice.actions;
export default singleEventSlice.reducer;