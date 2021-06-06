module.exports = (io, socket) => {
	const chatMessage = payload => {
		console.log(payload);
	};

	socket.on('chat message', chatMessage);
}