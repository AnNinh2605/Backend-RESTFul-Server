const User = require('../models/users');
const { uploadSingleFile, uploadMultipleFile } = require('../services/fileService')

const getUsersAPI = async (req, res) => {
    let results = await User.find({});
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}
const postCreateUsersAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    let results = await User.create({
        email: email,
        name: name,
        city: city
    })
    return res.status(200).json({
        errorCode: 0,
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
    let results = await User.deleteOne({_id: getUserByID});
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
    if (Array.isArray(req.files.image)){
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
    getUsersAPI, postCreateUsersAPI, putUpdateUsersAPI, deleteUsersAPI, postUploadFileAPI, postUploadMultipleFileAPI
}