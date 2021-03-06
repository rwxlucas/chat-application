const axios = require('axios')

export const searchUser = (username) => {
	return new Promise(async (resolve, reject) => {
		try {
			return resolve(await axios.get(`http://localhost:4000/friend/search/${username}`, {
				headers: { 'xauthorization': localStorage.getItem("xauthorization") }
			}));
		} catch (error) {
			return reject(error)
		}
	})
}

export const searchUserById = id => {
	return new Promise(async (resolve, reject) => {
		try {
			return resolve(await axios.get(`http://localhost:4000/friend/searchbyid/${id}`, {
				headers: { 'xauthorization': localStorage.getItem("xauthorization") }
			}));
		} catch (error) {
			return reject(error)
		}
	})
}

export const add = (username) => {
	return new Promise(async (resolve, reject) => {
		try {
			return resolve(await axios.post(`http://localhost:4000/friend/add`, {
				target: username
			}, {
				headers: { 'xauthorization': localStorage.getItem("xauthorization") }
			}));
		} catch (error) {
			return reject(error)
		}
	})
}

export const removeRequest = (username) => {
	return new Promise(async (resolve, reject) => {
		try {
			return resolve(await axios.post(`http://localhost:4000/friend/removeRequest`, {
				target: username
			}, {
				headers: { 'xauthorization': localStorage.getItem("xauthorization") }
			}));
		} catch (error) {
			return reject(error)
		}
	})
}