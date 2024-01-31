
const { createProjectService, getProjectService, deleteProjectService, updateProjectService } = require('../services/projectService')
const Joi = require('joi');

module.exports = {
    postCreateProjectsAPI: async (req, res) => {
        let { name, description, customerInfor, leader, startDate, endDate } = req.body;
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            description: Joi.string(),
            customerInfor: Joi.prefs({}),
            leader: Joi.prefs({}),
            startDate: Joi.number()
                .integer()
                .min(1900)
                .max(2013),
            endDate: Joi.number()
                .integer()
                .min(1900)
                .max(2013)
        })
        let { error } = schema.validate({ name, description, customerInfor, leader, startDate, endDate }, { abortEarly: false });
        if (error){
            return res.status(200).json({
                data: error
            })
        }
        else { 
            let results = await createProjectService(req.body);
            return res.status(200).json({
                error: 0,
                data: results
            })
        }
    },

    getProjectsAPI: async (req, res) => {
        let results = await getProjectService(req.query);
        // console.log(results);
        return res.status(200).json({
            error: 0,
            data: results
        })
    },

    deleteProjectsAPI: async (req, res) => {
        let id = req.query.id;
        let results = await deleteProjectService(id);
        return res.status(200).json({
            error: 0,
            data: results
        })
    },
    
    putProjectsAPI: async (req, res) => {
        let results = await updateProjectService(req.body);
        return res.status(200).json({
            error: 0,
            data: results
        })
    }
}