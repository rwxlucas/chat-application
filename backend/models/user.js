const { Schema, model } = require('mongoose')

const userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	image: { type: String },
	displayName: { type: String },
	status: { type: String },
	friendList: { type: Array },
	friendRequests: { type: Array, default: [] },
	created: { type: Date, default: Date.now }
});

const userModel = model('user', userSchema);

module.exports = userModel