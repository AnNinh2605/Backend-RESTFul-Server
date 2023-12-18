const express = require('express');
const router = express.Router();
const { homeController, abc, staticfile } = require('../controllers/homeController');

//route
    router.get('/', homeController);
    router.get('/abc', abc)
    router.get('/staticfile', staticfile);

module.exports = router