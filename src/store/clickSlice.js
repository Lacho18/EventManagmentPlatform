import { createSlice } from '@reduxjs/toolkit';

const clickSlice = createSlice({
    name: 'click',
    initialState: {
        shown: false
    },
    reducers: {
        hide: (state) => {
            console.log("I clicked");
            if (state.shown === true) {

                state.shown = false;
            }
        },
        show: (state) => {
            console.log("I clicked and set it to true");
            if (state.shown === false) {
                state.shown = true;
            }
        }
    },
});

export const { hide, show } = clickSlice.actions;
export default clickSlice.reducer;