const express = require('express');
const router = express.Router();
const { homeController, abc, staticfile, create_user, create, edit_user } = require('../controllers/homeController');

//route
    router.get('/', homeController);
    router.get('/abc', abc)
    router.get('/staticfile', staticfile);
    router.get('/create', create);
    router.post('/create_user', create_user);
    router.get('/edit_user', edit_user);

module.exports = router