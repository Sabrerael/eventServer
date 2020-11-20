var express = require('express');
var events = require('./events');
var app = express();
var fs = require("fs");

app.get('/', function (req, res, next) {
    var string = JSON.stringify(events[0]);
    var objectValue = JSON.parse(string);

    console.log( string.toString() );
    res.end( string.toString() );
});

app.get('/search/:input', function (req, res, next) {
    var input = req.params.input;
    console.log( input );
    res.end( input );
});

app.get('/location/:location', function (req, res, next) {
    var location = req.params.location;
    console.log( location );
    res.end( location );
});

app.get('/date/:date', function (req, res, next) {
    var date = req.params.date;
    console.log( date );
    res.end( date );
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port =  server.address().port
    console.log("App listening at http://%s:%s", host, port)
});

module.exports = server;
