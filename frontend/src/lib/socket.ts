import { io, Socket } from 'socket.io-client';

// Use the environment variable, or fallback to the hardcoded Render URL for production safety
const PROD_URL = 'https://roshni-enterprise-backend.onrender.com';
const SOCKET_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? PROD_URL : 'http://localhost:5000');


console.log('Connecting to socket at:', SOCKET_URL);

export const socket: Socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: true,
    transports: ['websocket', 'polling'], // Try websocket first
    path: '/socket.io/'
});

socket.on('connect', () => {
    console.log('Connected to real-time server:', socket.id);
});

socket.on('disconnect', () => {
    console.log('Disconnected from real-time server');
});

export default socket;
