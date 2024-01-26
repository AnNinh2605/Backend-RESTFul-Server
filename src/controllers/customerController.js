const { uploadSingleFile } = require('../services/fileService')
const { createCustomerService, createCustomerArrayService, getAllCustomerService, updateCustomerService, deleteCustomer, deleteCustomersArray } = require('../services/customerService')

const aqp = require('api-query-params');

module.exports = {
    postCreateCustomersAPI: async (req, res) => {
        let { name, email, city, phone, description } = req.body;
        let imageUrl = "";
        if (!req.files || Object.keys(req.files).length === 0) {

        }
        else {
            let results = await uploadSingleFile(req.files.image);
            imageUrl = results.path;
        }
        let customerData = {
            name,
            email,
            city,
            phone,
            description,
            image: imageUrl
        }
        let results = await createCustomerService(customerData);
        return res.status(200).json({
            error: 0,
            data: results
        })
    },
    // create many customer in a time or from a data file
    postCreateCustomersArrayAPI: async (req, res) => {
        let results = await createCustomerArrayService(req.body.customers)
        if (results) {
            return res.status(200).json({
                error: 0,
                data: results
            })
        }
        else {
            return res.status(200).json({
                error: -1,
                data: results
            })
        }
    },
    //get all customers
    getCustomersAPI: async (req, res) => {
        const { filter, limit } = aqp(req.query);
        let page = filter.page;
        delete filter.page;
        let results = null;
        if (limit && page) {
            results = await getAllCustomerService(filter, limit, page);
        }
        else {
            results = await getAllCustomerService();
        }
        return res.status(200).json({
            error: 0,
            data: results
        })
    },
    // update customer
    putCustomersAPI: async (req, res) => {
        let { id, name, email, city, phone, description } = req.body;
        let results = await updateCustomerService(id, name, email, city, phone, description);
        if (results) {
            res.status(200).json({
                error: 0,
                data: results
            })
        }
        else {
            res.status(200).json({
                error: -1,
                data: results
            })
        }
    },
    deleteCustomersAPI: async (req, res) => {
        let id = req.body.id;
        let results = await deleteCustomer(id);
        if (results) {
            res.status(200).json({
                error: 0,
                data: results
            })
        }
        else {
            res.status(200).json({
                error: -1,
                data: results
            })
        }
    },
    deleteCustomersArrayAPI: async (req, res) => {
        let data = req.body.customersId;
        let results = await deleteCustomersArray(data);
        if (results) {
            return res.status(200).json({
                error: 0,
                data: results
            })
        }
        else {
            return res.status(200).json({
                error: -1,
                data: results
            })
        }
    }
}