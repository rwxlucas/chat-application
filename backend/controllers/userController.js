const User = require('../models/user');

const getUserInfo = async (req, res) => {
	const userID = req.headers.id;
	if(!userID) return res.status(400).json(({message: 'UserID not provided'}));
	try {
		const user = await User.findById(userID);
		return res.status(200).json({
			displayName: user.displayName ? user.displayName : '',
			friendList: user.friendList ? user.friendList : [],
			image: user.image ? user.image : '',
			status: user.status ? user.status : ''
		})
	} catch (error) {
		return res.status(500).json({message});
	}
}

const updateUserInfo = async (req, res) => {
	const userID = req.headers.id;
	const { displayName, status, image } = req.body;
	if(!userID) return res.status(400).json(({message: 'UserID not provided'}));
	try {
		await User.findByIdAndUpdate(userID, { displayName, status, image });
		return res.status(200).json({message: 'User updated'});
	} catch (error) {
		console.log(error)
		return res.status(500).json({error});
	}
}

module.exports = {
	updateUserInfo,
	getUserInfo
};