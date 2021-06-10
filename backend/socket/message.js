module.exports = (io, socket, getClientSocket) => {
	const chatMessage = payload => {
		const user = getClientSocket(payload.id);
		if(user) user.emit('chat message', {username: payload.sender, message: payload.message, date: payload.date});
	};

	socket.on('chat message', chatMessage);
}