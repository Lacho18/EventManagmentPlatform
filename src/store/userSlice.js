import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        hasLoggedIn: false,
        onSavedItems: false,
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
        },
        onSavedButtonClicked: (state) => {
            state.onSavedItems = true;
        },
        removeSaved: (state) => {
            state.onSavedItems = false;
        },
        //On message send on the chat app, the array is updated so that the user that lastly sends the message to be first and this dynamically changes it
        setsUserChats: (state, action) => {
            if (state.hasLoggedIn) {
                if (state.userData) {
                    state.userData.chats = action.payload.userChats
                }
            }
        }
    },
});

export const { logIn, logOut, changeHandler, nullData, onSavedButtonClicked, removeSaved, setsUserChats } = userSlice.actions;
export default userSlice.reducer;
