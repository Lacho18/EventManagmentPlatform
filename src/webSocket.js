import { addNewMessage, setChatWithArray } from "./store/chatsSlice";

let ws;

export const connectWebSocket = (url, dispatch, currentPath) => {
    if (!ws) {
        ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            //The message that is send with web socket and the receiver and sender of the message
            const receivedMessage = JSON.parse(event.data);
            dispatch(addNewMessage({ newMessage: receivedMessage, currentPath: currentPath }));
            dispatch(setChatWithArray({ prevChats: receivedMessage.chats }));
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            ws = null;
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
};

export const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not connected');
    }
};

export const disconnectWebSocket = () => {
    if (ws) {
        ws.close();
    }
};

export default ws;
