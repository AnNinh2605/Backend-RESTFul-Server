require('dotenv').config();
const express = require('express')
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const connection = require('./config/database');
const fileUpload = require('express-fileupload');

const { MongoClient } = require('mongodb');

// import express form 'express';
const app = express()
const port = process.env.PORT || 8101;
const hostname = process.env.HOST_NAME;

// config template engine
configViewEngine(app);
// default options
app.use(fileUpload());
//config request.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded 

//route
app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);

// conection to mongoDB
(async () => {
  try {
    //using mongoose
    await connection();

    // using mongodb driver
    // Connection URL
    // const url = process.env.DB_HOST_MONGODBDRIVER;
    // const client = new MongoClient(url);
    // // Database Name
    // const dbName = process.env.DB_DATABASE;
    // // Use connect method to connect to the server
    // async function main() {
    //   await client.connect();
    //   console.log('Connected successfully to server');
    //   const db = client.db(dbName);
    //   const collection = db.collection('documents');
    // }
    // main();

    app.listen(port, hostname, () => {
      console.log(`Backend mongoDB listening on port ${port}`)
    })
  } catch (e) {
    console.log("Connection to DB error ", e)
  }
})()
