import { createSlice } from '@reduxjs/toolkit';

const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        currentChatMessages: [],
    },
    reducers: {
        setCurrentChatMessages: (state, action) => {
            state.currentChatMessages = action.payload.messages;
        },
        addNewMessage: (state, action) => {
            state.currentChatMessages = [...state.currentChatMessages, action.payload.newMessage];

            console.log(state.currentChatMessages);
        },
    },
});

export const { setCurrentChatMessages, addNewMessage } = chatsSlice.actions;
export default chatsSlice.reducer;