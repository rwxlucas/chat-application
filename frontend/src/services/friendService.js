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