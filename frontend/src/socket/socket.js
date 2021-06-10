import { io } from 'socket.io-client';
import moment from 'moment';

export let socket;

const setUser = (username) => socket.emit('setUser', username);

export const socketInit = username => {
	socket = io("http://localhost:4000");
	setUser(username);
}


export const sendMessage = (id, message, sender) => socket.emit('chat message', {sender ,id, message, date: moment()});

export const sendAddRequest = (username, target) => socket.emit('friendRequest', { username, target });

export const acceptFriendRequest = () => {
	
}

export const disconnectSocket = (user) => socket.emit('disconnectClient', user);
