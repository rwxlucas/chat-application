const { Router } = require('express');
const verifyJwt = require('../middlewares/verifyJwt');
const auth = require('./auth');
const friend = require('./friend');
const user = require('./user');

const route = Router();

route.use('/auth', auth);
route.use('/friend', [verifyJwt], friend);
route.use('/user', [verifyJwt], user);

module.exports = route;