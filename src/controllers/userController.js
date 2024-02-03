const User = require('../models/users');
const { uploadSingleFile, uploadMultipleFile } = require('../services/fileService')

const aqp = require('api-query-params');
const Joi = require('joi');

const getUsersAPI = async (req, res) => {
    let { filter, limit } = aqp(req.query);
    let page = filter.page;
    delete filter.page;
    let skip = (page - 1) * limit;
    let results = null;
    try {
        if (limit && page) {
            results = await User
                .find(filter)
                .skip(skip)
                .limit(limit)
                .exec();
        }
        else {
            results = await User.find({});
        }
    } catch (e) {
        console.log("Error ", e);
    }
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

const postCreateUsersAPI = async (req, res) => {
    // let { email, name, city } = req.body;

    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        city: Joi.string()
    })
    let { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(200).json({
            data: error
        })
    }
    else {
        let results;
        try {
            results = await User.create({...req.body})
        } catch (e) {
            console.log("Error ", e)
        }
        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    }
}

const postCreateUsersArrayAPI = async (req, res) => {
    try {
        let results = await User.insertMany(req.body.users)
        return results;
    } catch (e) {
        console.log("Error", e)
    }

    return res.status(200).json({
        error: 0,
        data: results
    })
}

const putUpdateUsersAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userID = req.body.id;
    let results = await User.updateOne({ _id: userID }, { email: email, name: name, city: city })
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

const deleteUsersAPI = async (req, res) => {
    let getUserByID = req.body.id;
    let results = await User.deleteOne({ _id: getUserByID });
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

const postUploadFileAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let results = await uploadSingleFile(req.files.image);
    return res.status(200).json({
        error: 0,
        data: results
    })
}

const postUploadMultipleFileAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    //upload multiple file files is a array
    if (Array.isArray(req.files.image)) {
        let results = await uploadMultipleFile(req.files.image);
        return res.status(200).json({
            error: 0,
            data: results
        })
    }
    else {
        // upload single file 
        return await postUploadFileAPI(req, res);
    }
}

module.exports = {
    getUsersAPI, postCreateUsersAPI, putUpdateUsersAPI, deleteUsersAPI, postUploadFileAPI, postUploadMultipleFileAPI, postCreateUsersArrayAPI
}