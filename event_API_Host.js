var express = require('express');
var events = require('./events');
var app = express();
var fs = require("fs");

app.get('/', function (req, res) {
    console.log( events.toString() );
    res.end( events.toString() );
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port =  server.address().port
    console.log("App listening at http://%s:%s", host, port)
});