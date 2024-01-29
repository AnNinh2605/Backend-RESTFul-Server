const Task = require('../models/task');

const createTaskService = async (data) => {
    let results = null;
    try {
        if (data.type === "EMPTY-TASK"){
            results = await Task.create(data);
        }
        return results;
    } catch (e) {
        console.log("Error", e);
    }
}
const getTaskService = async(filter, limit, page, populate) => {
    let skip = (page - 1) * limit;
    let results = null;
    try {
        if (limit && page) {
            results = await Task
            .find(filter)
            .populate(populate)
            .skip(skip)
            .limit(limit)
            .exec();
        }
        else {
            results = await Task.find({});
        }
        return results;
    } catch (e) {
        console.log("Error", e);
    }
}
const UpdateTaskService = async(data) => {
    try {
        let results = await Task.updateOne(
            {_id: data.id}, 
            { ... data });
        return results;
    } catch (e) {
        console.log("Error", e);
    }
}
const deleteTaskService = async(id) => {
    try {
        let results = await Task.deleteById(id);
        return results;
    } catch (e) {
        console.log("Error", e);
    }
}

module.exports = { createTaskService, UpdateTaskService, getTaskService, deleteTaskService }