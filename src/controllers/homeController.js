const connection = require('../config/database')

const homeController = (req, res) => {
    return res.render('homePage.ejs');
}

const abc = (req, res) => {
    res.send('ABC')
}
const staticfile =(req, res) => {
    res.render('view1.ejs') 
}
const create_user =(req, res) => {
    console.log("User infor: ", req.body)
    res.send('Create user successful')
}

module.exports = {
    homeController,
    abc,
    staticfile,
    create_user
}