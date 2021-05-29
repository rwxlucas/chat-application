const axios = require('axios')

export const login = (username, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			return resolve(await axios.post('http://localhost:4000/auth/login', {username, password}));
		} catch (error) {
			return reject(error)
		}
	})
}

export const register = (username, password, email) => {
	return new Promise(async (resolve, reject) => {
		try {
			return resolve(await axios.post('http://localhost:4000/auth/register', {username, password, email}));
		} catch (error) {
			return reject(error)
		}
	})
}

const authService = {
	login,
	register
}
export default authService