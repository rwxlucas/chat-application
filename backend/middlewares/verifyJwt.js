const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');

const verifyJwt = (req, res, next) => {
	const { xauthorization } = req.headers;
	if(xauthorization && typeof xauthorization === 'string'){
		try {
			const jwtValid = jwt.verify(xauthorization, JWT_SECRET);
			const { id } = jwt.decode(xauthorization)
			if(!jwtValid) return res.status(403).json({message: 'Not authorized!'});
			if(id) req.headers.id = id;
			return next();
		} catch (error) {
			if(error) return res.status(500).json({error});
		}
	}
	return res.status(403).json({message: 'Not authorized!'});
}

module.exports = verifyJwt;