const connection = require('../config/database')

const get_all_users = async() => {
    let [rows, fields] = await connection.query('SELECT * FROM Users');
    return rows;
}

const getUserByID = async(getUserID) => {
    let [rows, fields] = await connection.query('SELECT * FROM Users u WHERE id = ?', [getUserID]);
    let result = rows && rows.length > 0 ? rows[0] : {}
    return result;
}

const updateUserByID = async(email, name, city, userID) => {
    let [rows, fields] = await connection.query(`UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?`,
    [email, name, city, userID]);
}

const deleteUserById = async(id) => {
    let [rows, fields] = await connection.query('DELETE FROM Users WHERE id = ?', [id]);
    
}
module.exports = {
    get_all_users, getUserByID, updateUserByID, deleteUserById
}