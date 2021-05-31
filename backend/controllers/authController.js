const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');

const register = async (req, res) => {
	const { username, password, email } = req.body;
	if (!username || !password || !email) return res.status(400).json({ message: 'Incorrect request' });
	const hasUser = await User.findOne({ username });
	if (hasUser) return res.status(400).json({ message: 'User already exists' });
	const newUser = new User({ username, password: await bcrypt.hash(password, 10), email });
	await newUser.save()
	return res.status(200).json({ message: 'User created' });
}

const login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) return res.status(400);
	const hasUser = await User.findOne({ username });
	if (!hasUser) return res.status(404).json({ message: 'User not found!' });
	const verifyPassword = await bcrypt.compare(password, hasUser.password);
	if (!verifyPassword) return res.status(403).json({ message: 'Incorrect password', status: 403 });
	return res.status(200).json({ xauthorization: jwt.sign({id: hasUser.id}, JWT_SECRET, { expiresIn: 86400 }) });
}

module.exports = {
	register,
	login
}