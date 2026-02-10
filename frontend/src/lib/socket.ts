import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const socket: Socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: true,
});

socket.on('connect', () => {
    console.log('Connected to real-time server:', socket.id);
});

socket.on('disconnect', () => {
    console.log('Disconnected from real-time server');
});

export default socket;
