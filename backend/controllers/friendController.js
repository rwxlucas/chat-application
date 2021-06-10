const User = require('../models/user');
const { getClientSocket } = require('../socket');

const searchUser = async (req, res) => {
	const { username } = req.params;
	const person = await User.findOne({ username: username.toLowerCase() });
	if (person) return res.status(200).json({ id: person.id, username: person.username, displayName: person.displayName, image: person.image });
	return res.status(404).json({ message: 'User not found!' });
}

const searchUserById = async (req, res) => {
	const { id } = req.params;
	const person = await User.findById(id);
	if (person) return res.status(200).json({ id: person.id, username: person.username, displayName: person.displayName, image: person.image });
	return res.status(404).json({ message: 'User not found!' });
}

const add = async (req, res) => {
	const { target } = req.body;
	if (!target) return res.status(400).json({ message: 'Incorrect request' });
	try {
		const targetUser = await User.findOne({ username: target });
		const requesterUser = await User.findById(req.headers.id);
		if (targetUser && requesterUser) {
			if (targetUser.friendList.includes(requesterUser.id)) return res.status(400).json({ message: `${requesterUser.username} is already a friend` });
			if (requesterUser.friendList.includes(targetUser.id)) return res.status(400).json({ message: `${targetUser.username} is already a friend` });
			targetUser.friendList.push(requesterUser.id);
			targetUser.friendRequests = targetUser.friendRequests.filter(item => item.username !== requesterUser.username);
			requesterUser.friendList.push(targetUser.id);
			requesterUser.friendRequests = requesterUser.friendRequests.filter(item => item.username !== targetUser.username);
			const requesterSocket = getClientSocket(requesterUser.username);
			if(requesterSocket) requesterSocket.emit('friendRequestAccepted', targetUser.username);
			await targetUser.save();
			await requesterUser.save();
			return res.status(200).json({ message: 'Friend added' });
		}
	} catch (error) {
		if (error) return res.status(500).json({ error });
	}
	return res.status(404).json({ message: 'User not found!' });
}

const removeRequest = async (req, res) => {
	const { target } = req.body;
	const { id } = req.headers;
	if (!target) return res.status(400).json({ message: 'Incorrect request' });
	try {
		const user = await User.findById(id);
		user.friendRequests = user.friendRequests.filter(item => item.username !== target);
		await user.save();
		return res.status(200).json({message: 'Request successfully deleted'});
	} catch (error) {
		console.log(error);
		if (error) return res.status(500).json({ error });
	}
}

module.exports = {
	add,
	searchUser,
	removeRequest,
	searchUserById
}