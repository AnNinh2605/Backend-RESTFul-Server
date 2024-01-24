const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    city: String,
    phone: String,
    image: String,
    description: String
},
    { timestamps: true });
const Customer = mongoose.model('Customer', CustomerSchema); // tạo object // tạo collection

module.exports = Customer;