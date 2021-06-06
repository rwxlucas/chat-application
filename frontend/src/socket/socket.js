import { io } from 'socket.io-client';

export let socket;

const setUser = (username) => {
	socket.emit('setUser', username);
}

export const socketInit = username => {
	socket = io("http://localhost:4000");
	setUser(username);
}


export const sendMessage = () => {
	socket.emit('chat message', 'aa');
}

export const sendAddRequest = (username, target) => {
	socket.emit('friendRequest', { username, target });
}

export const acceptFriendRequest = () => {
	
}

export const disconnectSocket = (user) => socket.emit('disconnectClient', user);
