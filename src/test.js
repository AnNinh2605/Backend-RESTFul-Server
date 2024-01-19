require('dotenv').config();
const express = require('express')
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web')
const connection = require('./config/database');
// import express form 'express';
const app = express()
const port = process.env.PORT || 8101;
const hostname = process.env.HOST_NAME;

const mongoose = require('mongoose');

// config template engine
configViewEngine(app);

//config request.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded 

//route
app.use('/', webRoutes);

const kittySchema = new mongoose.Schema({
  name: String
});
const Kitten = mongoose.model('Kitten', kittySchema); // xuất ra biến bằng hàm model// tên folder
const fluffy = new Kitten({ name: 'fluffy' }); // tạo ở database
fluffy.save();

// conection to mongoDB
(async() => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Backend mongoDB listening on port ${port}`)
    })
  } catch (e) {
    console.log("Connection to DB error ",e)
  }
})()
