const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String
}); // schema tạo dự liệu 
const Users = mongoose.model('Users', userSchema); // tạo object // tạo collection

module.exports = Users;