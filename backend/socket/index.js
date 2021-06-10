const User = require('../models/user');
const { friend } = require('./friend');
const message = require('./message');
const user = require('./user');

const socketMap = new Map();

const getClientSocket = user => {
	return socketMap.get(user)
};

const onConnection = async (io, client) => {
	message(io, client, getClientSocket);
	friend(io, client, socketMap);
	user(io, client, socketMap);
}

module.exports = {
	onConnection,
	getClientSocket
}