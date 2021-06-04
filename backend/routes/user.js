const { Router } = require('express');
const { updateUserInfo, getUserInfo } = require('../controllers/userController');

const route = Router();

route.get('/', getUserInfo);
route.post('/update', updateUserInfo);

module.exports = route;