const { Router } = require('express');
const auth = require('./auth');
const friend = require('./friend');
const verifyJwt = require('../middlewares/verifyJwt');

const route = Router();

route.use('/auth', auth);
route.use('/friend', [verifyJwt], friend);

module.exports = route;