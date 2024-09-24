import io from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:4000';

console.log(URL);

export const socket = io(URL, { transports: ['websocket'] });