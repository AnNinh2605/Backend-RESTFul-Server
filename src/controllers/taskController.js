const { createTaskService, UpdateTaskService, getTaskService, deleteTaskService } = require('../services/taskService')

const aqp = require('api-query-params');
const Joi = require('joi');

module.exports = {
    postCreateTasksAPI: async (req, res) => {
        let { name, description, startDate, endDate } = req.body;

        //validate với joi
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            description: Joi.string(),
            startDate: Joi.number()
                .integer()
                .min(1900)
                .max(2013),
            endDate: Joi.number()
                .integer()
                .min(1900)
                .max(2013)
        })
        //validate với joi//

        let { error } = schema.validate( { name, description, startDate, endDate}, { abortEarly: false });
        if (error) {
            return res.status(200).json({
                data: error
            })
        }
        else {
            let results = await createTaskService(req.body);
            return res.status(200).json({
                error: 0,
                data: results
            })
        }
    },

    getCreateTasksAPI: async (req, res) => {
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
    
    putCreateTasksAPI: async (req, res) => {
        let results = await UpdateTaskService(req.body);
        return res.status(200).json({
            error: 0,
            data: results
        })
    },
    
    deleteCreateTasksAPI: async (req, res) => {
        let id = req.query.id;
        let results = await deleteTaskService(id);
        return res.status(200).json({
            error: 0,
            data: results
        })
    },
}