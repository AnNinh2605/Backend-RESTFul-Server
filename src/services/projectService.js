const aqp = require('api-query-params');

const Project = require('../models/project')

const createProjectService = async (data) => {
    let results;
    try {
        if (data.type === "EMPTY-PROJECT") {
            results = await Project.create(data);
        }
        if (data.type === "ADD-USERS") {
            let findProject = await Project.findById(data.projectID).exec();
            for (let i = 0; i < data.userID.length; i++) {
                findProject.usersInfor.push(data.userID[i]);
            }
            results = await findProject.save();
        }
        if (data.type === "REMOVE-USERS") {
            let findProject = await Project.findById(data.projectID).exec();
            for (let i = 0; i < data.userID.length; i++) {
                findProject.usersInfor.pull(data.userID[i]);
            }
            results = await findProject.save();
        }
        if (data.type === "ADD-TASKS") {
            let findProject = await Project.findById(data.projectID).exec();
            for (let i = 0; i < data.taskArr.length; i++) {
                findProject.tasks.push(data.taskArr[i])
            }
            results = await findProject.save();
        }
        return results;
    } catch (e) {
        console.log("Error ", e)
    }
}

const getProjectService = async (data) => {
    let page = data.page;
    const { filter, limit, population } = aqp(data);
    delete filter.page;
    let skip = (page - 1) * limit;
    let results = null;
    try {
        if (limit && page) {
                results = await Project
                    .find(filter)
                    .populate(population)
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

const deleteProjectService = async (id) => {
    try {
        let results = await Project.deleteById(id);
        return results;
    } catch (e) {
        console.log("Error", e);
    }
}

const updateProjectService = async (projectData) => {
    try {
        let results = await Project.updateOne(
            { _id: projectData.id },
            { ...projectData });
        return results;
    } catch (e) {
        console.log("Error", e);
    }
}
module.exports = { createProjectService, getProjectService, deleteProjectService, updateProjectService }