require('dotenv').config();
const express = require('express')
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const connection = require('./config/database');
// import express form 'express';
const app = express()
const port = process.env.PORT || 8101;
const hostname = process.env.HOST_NAME;

// config template engine
configViewEngine(app);

//config request.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded 

//route
app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);

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
