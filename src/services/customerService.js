const Customer = require('../models/customer');

const createCustomerService = async(customerData) => {
    try {
        let results = await Customer.create({
            email: customerData.email,
            name: customerData.name,
            city: customerData.city,
            phone: customerData.phone,
            description: customerData.description,
            image: customerData.image
        })
        return results;
    } catch (e) {
        console.log(e)
        return null;
    }
}

const createCustomerArrayService = async (data) => {
    try {
        let results = await Customer.insertMany(data);
        return results;
    } catch (e) {
        console.log("Error", e);
        return null;
    }
}

const getAllCustomerService = async() => {
    try {
        let results = await Customer.find({});
        return results;
    } catch (e) {
       console.log("Error", e);
       return null;
    }
}

const updateCustomerService = async (id, name, email, city, phone, description) => {
    try {
        let results = await Customer.updateOne(
            {_id: id}, 
            { name: name, city: city, email: email, phone: phone, description: description });
        return results;
    } catch (e) {
        console.log("Error ", e);
        return null;
    }
}

const deleteCustomer = async (id) => {
    try {
        let results = await Customer.deleteById(id)
        return results;
    } catch (e) {
        console.log("Error ", e)
        return null;
    }
}

const deleteCustomersArray = async (data) => {
    try {
        let results = await Customer.delete({ _id: { $in: data } });
        return results;
    } catch (e) {
        console.log("Error", e);
        return null;
    }
}
module.exports = { createCustomerService, createCustomerArrayService, getAllCustomerService, updateCustomerService, deleteCustomer, deleteCustomersArray }