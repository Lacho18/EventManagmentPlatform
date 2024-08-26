import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
    name: 'error',
    initialState: {
        errorMessage: ""
    },
    reducers: {
        setError: (state, action) => {
            state.errorMessage = action.payload;
        },
        nullError: (state) => {
            state.errorMessage = "";
        }
    },
});

export const { setError, nullError } = errorSlice.actions;
export default errorSlice.reducer;