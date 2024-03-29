const express = require('express');
const routerAPI = express.Router();

const { getUsersAPI, postCreateUsersAPI, postCreateUsersArrayAPI, putUpdateUsersAPI, deleteUsersAPI, postUploadFileAPI, postUploadMultipleFileAPI } = require('../controllers/userController');

const { postCreateCustomersAPI, postCreateCustomersArrayAPI, getCustomersAPI, putCustomersAPI, deleteCustomersAPI, deleteCustomersArrayAPI } = require('../controllers/customerController');

const { postCreateProjectsAPI, getProjectsAPI, deleteProjectsAPI, putProjectsAPI } = require('../controllers/projectController')

const { postCreateTasksAPI, putCreateTasksAPI, getCreateTasksAPI, deleteCreateTasksAPI } = require('../controllers/taskController')
//route
routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', postCreateUsersAPI);
routerAPI.post('/users-many', postCreateUsersArrayAPI);
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
routerAPI.delete('/projects', deleteProjectsAPI);
routerAPI.put('/projects', putProjectsAPI);

routerAPI.post('/tasks', postCreateTasksAPI);
routerAPI.get('/tasks', getCreateTasksAPI);
routerAPI.put('/tasks', putCreateTasksAPI);
routerAPI.delete('/tasks', deleteCreateTasksAPI);

module.exports = routerAPI