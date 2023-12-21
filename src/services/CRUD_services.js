const connection = require('../config/database')

const get_all_users = async() => {
    let [rows, fields] = await connection.query('SELECT * FROM Users');
    return rows;
}

module.exports = {
    get_all_users
}