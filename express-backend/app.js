// load express module
var express = require('express');
//Create express app
var app = express();
// load mongoDB
require('./setupMongo')();

var myLogger = function(req, res, next) {
    console.log('LOGGED')
    next()
}

app.use(myLogger)

// route definition
app.get('/', function (req, res) {
    res.send('Hello World');
});

// Start server
// app.listen(3000, function () {
//     console.log('App listening at Port 3000..');
// });
//app.listen(3000)

module.exports = app;