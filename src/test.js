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

// config template engine
configViewEngine(app);

//route
app.use('/', webRoutes)

// simple query
connection.query(
  'SELECT * FROM Users u',
  function(err, results, fields) {
    console.log("===", results); // results contains rows returned by server
  }
);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})