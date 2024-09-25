import { createSlice } from '@reduxjs/toolkit';

const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        currentChatMessages: [],
        hasChatWithArray: [],
        unreadMessages: 0,
    },
    reducers: {
        //Sets the array of messages that come from /chats GET method from the backend
        setCurrentChatMessages: (state, action) => {
            state.currentChatMessages = action.payload.messages;
        },
        //Adds new message to the array in order to make real time chat application
        addNewMessage: (state, action) => {
            state.currentChatMessages = [...state.currentChatMessages, action.payload.newMessage];

            console.log(action.payload.currentPath);
            if (!action.payload.currentPath.includes('chat')) {
                console.log("ARE ot purviq put");
                state.unreadMessages = state.unreadMessages + 1;
            }
        },
        //Clears the array of messages that is visualized on the ChatsWindow component
        clearCurrentMessages: (state) => {
            state.currentChatMessages = [];
        },

        //On fetch request set the array of previous chats to chats field of the user data
        setChatWithArray: (state, action) => {
            state.hasChatWithArray = action.payload.prevChats;
        },
        //Adds dynamically to the array of users that the current user has already chat with
        addChatWith: (state, action) => {
            const prevArray = [...state.hasChatWithArray];
            const newChat = Number(action.payload.newChat);
            if (!prevArray.includes(newChat)) {
                prevArray.unshift(newChat);
                state.hasChatWithArray = prevArray;
            }
        },
        //Clears the previous chat fields
        clearPrevChatsArray: (state) => {
            state.hasChatWithArray = [];
        },

        nullUnreadMessages: (state) => {
            state.unreadMessages = 0;
        }
    },
});

export const { setCurrentChatMessages, addNewMessage, clearCurrentMessages,
    setChatWithArray, addChatWith, clearPrevChatsArray, nullUnreadMessages } = chatsSlice.actions;
export default chatsSlice.reducer;