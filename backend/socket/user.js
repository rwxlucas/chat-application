const User = require('../models/user');

module.exports = (io, client, socketMap) => {
	const setUser = async payload => {
		try {
			const user = await User.findOne({username: payload});
			if(!socketMap.has(user.username)) socketMap.set(user.username, client);
	} catch (error) {
			console.log(error);
		}
	}

	const disconnectClient = (payload) => {
		if(socketMap.has(payload)) socketMap.delete(payload);
		client.disconnect();
	}

	client.on('setUser', setUser);
	client.on('disconnectClient', disconnectClient);
}