import { io } from 'socket.io-client';

let socket;

export const socketInit = () => {
	socket = io("http://localhost:4000");
}

export const sendMessage = () => {
	socket.emit('chat message', 'aa');
}

export const disconnectSocket = () => socket.emit('disconnectClient');
