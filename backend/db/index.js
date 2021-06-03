const mongoose = require('mongoose');

const dbInit = () => {
	mongoose.connect('mongodb://127.0.0.1:27017/chat-app', 
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
