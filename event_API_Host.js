var express = require('express');
var events = require('./events');
var app = express();
var fs = require("fs");

app.get('/', function (req, res, next) {
    var string = '';

    for (var i = 0; i < events.length; i++) {
        string += JSON.stringify(events[i]);
        string += '\n';
    }

    console.log( string.toString() );
    res.end( string.toString() );
});

app.get('/search/:input', function (req, res, next) {
    var input = req.params.input;
    var string = '';

    for (var i = 0; i < events.length; i++) {
        var event = JSON.stringify(events[i]);
        var title = events[i].Title.toString().toLowerCase();
        if (title.includes(input.toLowerCase())) {
            string += event;
            string += '\n';
        }
    }

    if ( string == '' ) {
        string = 'No results found';
    }

    console.log( string.toString() );
    res.end( string.toString() );
});

app.get('/location/:location', function (req, res, next) {
    var input = req.params.location;
    var string = '';

    for (var i = 0; i < events.length; i++) {
        var event = JSON.stringify(events[i]);
        var city = events[i].Location.City.toString().toLowerCase();
        var state = events[i].Location.State.toString().toLowerCase();
        var country = events[i].Location.Country.toString().toLowerCase();
        if (city.includes(input.toLowerCase() || state.includes(input.toLowerCase()) || country.includes(input.toLowerCase()))) {
            string += event;
            string += '\n';
        }
    }

    if ( string == '' ) {
        string = 'No results found';
    }

    console.log( string.toString() );
    res.end( string.toString() );
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
