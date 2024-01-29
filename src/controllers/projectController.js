
const { createProjectService, getProjectService, deleteProjectService, updateProjectService } = require('../services/projectService')

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
        let results = await getProjectService(req.query);
        // console.log(results);
        return res.status(200).json({
            error: 0,
            data: results
        })
    },
    deleteProjectsAPI: async(req, res) => {
        let id = req.query.id;
        let results = await deleteProjectService(id);
        return res.status(200).json({
            error: 0,
            data: results
        })
    }, 
    putProjectsAPI: async(req, res) => {
        let results = await updateProjectService(req.body);
        return res.status(200).json({
            error: 0,
            data: results
        })
    }
}