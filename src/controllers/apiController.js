const User = require('../models/users');

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

module.exports = {
    getUsersAPI, postCreateUsersAPI, putUpdateUsersAPI, deleteUsersAPI
}