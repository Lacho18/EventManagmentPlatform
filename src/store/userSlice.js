import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        hasLoggedIn: false,
        userData: {},
        loginUser: {
            email: "",
            password: ""
        },
        signUpUser: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            gender: "",
            //dateOfBirth: Date,
        }
    },
    reducers: {
        logIn: (state, action) => {
            state.userData = action.payload;
            state.hasLoggedIn = true;
        },
        logOut: (state) => {
            state.userData = {};
            state.hasLoggedIn = false;
        },
        //Function that handles all changes in the input fields from log in and sign up, and sets the inserted data to the states
        changeHandler: (state, action) => {
            state[action.payload.operation][action.payload.fieldName] = action.payload.value;
        },
        nullData: (state, action) => {
            state[action.payload.operation] = {};
        }
    },
});

export const { logIn, logOut, changeHandler, nullData } = userSlice.actions;
export default userSlice.reducer;