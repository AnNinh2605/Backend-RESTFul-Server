const express = require('express');
const routerAPI = express.Router();

const { getUsersAPI, postCreateUsersAPI, putUpdateUsersAPI, deleteUsersAPI, postUploadFileAPI, postUploadMultipleFileAPI } = require('../controllers/apiController');

const { postCreateCustomersAPI, postCreateCustomersArrayAPI, getCustomersAPI, putCustomersAPI, deleteCustomersAPI, deleteCustomersArrayAPI } = require('../controllers/customerController');

const { postCreateProjectsAPI, getProjectsAPI } = require('../controllers/projectController')
//route
routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUsersAPI);

routerAPI.put('/users', putUpdateUsersAPI);

routerAPI.delete('/users', deleteUsersAPI);

routerAPI.post('/file', postUploadFileAPI);

routerAPI.post('/files', postUploadMultipleFileAPI);

routerAPI.post('/customers', postCreateCustomersAPI);

routerAPI.post('/customers-many', postCreateCustomersArrayAPI);

routerAPI.get('/customers', getCustomersAPI);

routerAPI.put('/customers', putCustomersAPI);

routerAPI.delete('/customers', deleteCustomersAPI);

routerAPI.delete('/customers-many', deleteCustomersArrayAPI);

routerAPI.post('/projects', postCreateProjectsAPI);

routerAPI.get('/projects', getProjectsAPI);

module.exports = routerAPI