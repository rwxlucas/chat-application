const message = require('./message');

const socketMap = new Map();

const onConnection = (io, client) => {
	console.log(`${client.id} connected`);
	if(!socketMap.has(client.id)) socketMap.set(client.id, `${client.id} user`);
	message(io, client);
	
	client.on('disconnectClient', () => {
		client.disconnect();
	});
	client.on('disconnect', () => {
		socketMap.delete(client.id);
		console.log(`${client.id} disconnected`);
	});
}

module.exports = onConnection