const axios = require('axios')

export const getUserInfo = () => {
	return new Promise(async (resolve, reject) => {
		try {
			return resolve(await axios.get(`http://localhost:4000/user`, {
				headers: { 'xauthorization': localStorage.getItem("xauthorization") }
			}));
		} catch (error) {
			return reject(error)
		}
	})
}

export const setUserInfo = (displayName,status,image) => {
	return new Promise(async (resolve, reject) => {
		try {
			await axios.post(`http://localhost:4000/user/update`, {
				displayName, 
				status,
				image
			},{
				headers: { 'xauthorization': localStorage.getItem("xauthorization") }
			})
			return resolve({displayName, status, image});
		} catch (error) {
			return reject(error)
		}
	})
}