const { Router } = require('express');
const { add, searchUser, removeRequest } = require('../controllers/friendController');

const route = Router();

route.get('/search/:username', searchUser)
route.post('/add', add);
route.post('/removerequest', removeRequest);

module.exports = route;