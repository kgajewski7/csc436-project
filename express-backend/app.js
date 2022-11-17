require('dotenv').config()
// load express module
var express = require('express');
//Create express app
var app = express();
// load mongoDB
require('./setupMongo')();

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));

module.exports = app;