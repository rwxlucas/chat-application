const { Router } = require('express');
const { add, searchUser } = require('../controllers/friendController');

const route = Router();

route.get('/search/:username', searchUser)
route.post('/add', add);

module.exports = route;