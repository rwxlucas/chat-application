const User = require('../models/user');

module.exports = (io, socket, socketMap) => {
	const friendRequest = async payload => {
		const { username, target } = payload;
		try {
			const requester = await User.findOne({ username });
			const receiver = await User.findOne({ username: target });
			if (requester && requester.friendList.includes(receiver.id)) return;
			console.log('alo')
			const socketReceiver = socketMap.get(receiver.username);
			const userRequest = { name: requester.displayName, username: requester.username, image: requester.image };
			if (socketReceiver) socketReceiver.emit('friendRequest', userRequest);
			const receiverList = receiver.friendRequests.filter(item => item.username == requester.username);
			if(receiverList.length == 0) {
				receiver.friendRequests.push(userRequest);
				await receiver.save()
			}
		} catch (error) {
			console.log(error);
		}
	};

	socket.on('friendRequest', friendRequest);
	socket.on('acceptRequest', friendRequest);
}