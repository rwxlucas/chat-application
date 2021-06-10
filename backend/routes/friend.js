const { Router } = require('express');
const { add, searchUser, removeRequest, searchUserById } = require('../controllers/friendController');

const route = Router();

route.get('/search/:username', searchUser);
route.get('/searchbyid/:id', searchUserById);
route.post('/add', add);
route.post('/removerequest', removeRequest);

module.exports = route;