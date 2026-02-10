import { io, Socket } from 'socket.io-client';

// Use the environment variable, but fallback to relative path if not set (for proxy)
// However, for sockets, we usually need the absolute URL if backend is on a different domain.
const SOCKET_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

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
