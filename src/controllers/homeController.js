const connection = require('../config/database')
const { get_all_users } = require('../services/CRUD_services')

const homeController = async(req, res) => {
    let results = await get_all_users();
    return res.render('homePage.ejs', {rows: results});
}
const abc = (req, res) => {
    res.send('ABC')
}
const staticfile = (req, res) => {
    res.render('view1.ejs')
}
const create = (req, res) => {
    res.render('createUsers.ejs')
}
const create_user = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    // with placeholder
    // connection.query(
    //     `INSERT INTO Users (email, name, city)
    //     VALUES (?, ?, ?)`,
    //     [email, name, city],
    //     function (err, results) {
    //         console.log(results);
    //         res.send('Create user successful')
    //     }
    // );
    
    let [rows, fields] = await connection.query(`INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`,
            [email, name, city])
    console.log("check infor: ", rows);
    res.send("Create successful");
}

const edit_user = (req, res) => {
    res.render('editUsers.ejs')
}
module.exports = {
    homeController,
    abc,
    staticfile,
    create_user,
    create, 
    edit_user
}
