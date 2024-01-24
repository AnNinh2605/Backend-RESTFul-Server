const express = require('express');
const routerAPI = express.Router();

const { getUsersAPI, postCreateUsersAPI, putUpdateUsersAPI, deleteUsersAPI, postUploadFileAPI, postUploadMultipleFileAPI } = require('../controllers/apiController');

//route
routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUsersAPI);

routerAPI.put('/users', putUpdateUsersAPI);

routerAPI.delete('/users', deleteUsersAPI);

routerAPI.post('/file', postUploadFileAPI);

routerAPI.post('/files', postUploadMultipleFileAPI);


module.exports = routerAPI