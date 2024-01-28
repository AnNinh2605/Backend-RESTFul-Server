const { createProjectService, getProjectService } = require('../services/projectService')

const aqp = require('api-query-params');

module.exports = {
    postCreateProjectsAPI: async (req, res) => {
        let results = await createProjectService(req.body);
        // console.log(results);
        return res.status(200).json({
            error: 0,
            data: results
        })
    }, 
    getProjectsAPI: async (req, res) => {
        const { filter, limit } = aqp(req.query);
        let populate = req.query.populate;
        let page = filter.page;
        delete filter.page;
        let results = await getProjectService(filter, limit, page, populate);
        // console.log(results);
        return res.status(200).json({
            error: 0,
            data: results
        })
    }
}