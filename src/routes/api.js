const express = require('express');
const routerAPI = express.Router();

const { getUsersAPI, postCreateUsersAPI, putUpdateUsersAPI, deleteUsersAPI } = require('../controllers/apiController');

//route
routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUsersAPI);

routerAPI.put('/users', putUpdateUsersAPI);

routerAPI.delete('/users', deleteUsersAPI);

module.exports = routerAPI