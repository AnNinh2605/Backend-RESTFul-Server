const aqp = require('api-query-params');
const { createTaskService, UpdateTaskService, getTaskService, deleteTaskService  } = require('../services/taskService')

module.exports = { 
    postCreateTasksAPI: async(req, res) => {
        let results = await createTaskService(req.body);
        return res.status(200).json({
            error: 0,
            data: results
        })
    }, 
    getCreateTasksAPI: async(req, res) => {
        const { filter, limit } = aqp(req.query);
        let populate = req.query.populate;
        let page = filter.page;
        delete filter.page;
        let results = null;
        if (limit && page) {
            results = await getTaskService(filter, limit, page, populate);
        }
        else {
            results = await getTaskService();
        }
        return res.status(200).json({
            error: 0,
            data: results
        })
    },
    putCreateTasksAPI: async(req, res) => {
        let results = await UpdateTaskService(req.body);
        return res.status(200).json({
            error: 0,
            data: results
        })
    }, 
    deleteCreateTasksAPI: async(req, res) => {
        let id = req.query.id;
        let results = await deleteTaskService(id);
        return res.status(200).json({
            error: 0,
            data: results
        })
    },
}