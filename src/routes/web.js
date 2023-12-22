const express = require('express');
const router = express.Router();
const { homeController, abc, staticfile, create_user, create, edit_user, update_user, delete_user, confirm_delete_user } = require('../controllers/homeController');

//route
    router.get('/', homeController);
    router.get('/abc', abc)
    router.get('/staticfile', staticfile);
    router.get('/create', create);
    router.post('/create_user', create_user);
    router.post('/update_user', update_user);
    router.post('/delete_user/:id', delete_user);
    router.post('/delete_user', confirm_delete_user);
    router.get('/edit_user/:id', edit_user);

module.exports = router