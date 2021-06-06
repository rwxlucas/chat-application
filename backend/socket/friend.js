const User = require('../models/user');

module.exports = (io, socket, socketMap) => {
	const friendRequest = async payload => {
		const { username, target } = payload;
		try {
			const requester = await User.findOne({ username });
			const receiver = await User.findOne({ username: target });
			if (requester && requester.friendList.includes(receiver.id)) return;
			const socketReceiver = socketMap.get(receiver.username);
			if(socketReceiver) socketReceiver.emit('friendRequest', { name: requester.displayName, image: requester.image }); //
		} catch (error) {
			console.log(error);
		}
	};

	socket.on('friendRequest', friendRequest);
}