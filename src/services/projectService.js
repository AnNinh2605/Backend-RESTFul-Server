const Project = require('../models/project')

const createProjectService = async (data) => {
    let results;
    try {
        if (data.type === "EMPTY-PROJECT") {
            results = await Project.create(data);
        }
        if (data.type === "ADD-USERS") {
            let findProject = await Project.findById(data.projectID).exec();
            for (let i = 0; i<data.userID.length; i++) {
                findProject.usersInfor.push(data.userID[i]);
            }
            results = await findProject.save();
        }
        return results;
    } catch (e) {
        console.log("Error ", e)
    }
}
const getProjectService = async (filter, limit, page, populate) => {
    let skip = (page - 1) * limit;
    let results = null;
    try {
        if (limit && page) {
            results = await Project
                .find(filter)
                .populate(populate)
                .skip(skip)
                .limit(limit)
                .exec();
        }
        else {
            results = await Project.find({});
        }
        return results;
    } catch (e) {
        console.log("Error", e);
        return null;
    }
}
module.exports = { createProjectService, getProjectService }