const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

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

CustomerSchema.plugin(mongoose_delete,  { overrideMethods: 'all' });

const Customer = mongoose.model('customer', CustomerSchema); // tạo object // tạo collection

module.exports = Customer;