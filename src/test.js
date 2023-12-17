const express = require('express')
const path = require('path');
require('dotenv').config();
// import express form 'express';

const app = express()
const port = process.env.PORT || 8101;
const hostname = process.env.HOST_NAME;


// config template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'));

//route
app.get('/', (req, res) => {
  res.send('Hello Wordsdd!')
})

app.get('/abc', (req, res) => {
  res.render('view1.ejs')
})

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})