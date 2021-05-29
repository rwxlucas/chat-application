const mongoose = require('mongoose');

const dbInit = () => {
	mongoose.connect('mongodb://localhost:27017/chat-app', 
		{
			useNewUrlParser: true, 
			useUnifiedTopology: true
		}).then(() => {
			console.log('MongoDB running')
	}).catch((err) => {
		if(err) console.log(err);
	})
}

module.exports = {
	dbInit
}