const express = require('express');
const router = express.Router();
const { homeController, abc, staticfile, create_user } = require('../controllers/homeController');

//route
    router.get('/', homeController);
    router.get('/abc', abc)
    router.get('/staticfile', staticfile);
    router.post('/create_user', create_user);

module.exports = router