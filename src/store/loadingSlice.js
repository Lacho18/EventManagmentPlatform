import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: true,
        loadingMessage: "Loading..."
    },
    reducers: {
        setLoading: (state, object) => {
            state.isLoading = object.payload.boolValue;
        }
    },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;