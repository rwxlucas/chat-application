const { Router } = require('express');
const auth = require('./auth')

const route = Router();

route.use('/auth', auth);

module.exports = route;