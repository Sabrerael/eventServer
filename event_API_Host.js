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

//Returns events that occurred on that date
app.get('/date/:date', function (req, res, next) {
    var input = req.params.date;
    var string = '';
    const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/g;
    const inputDate = input.match(regex);
    if (inputDate == null) {
        console.log( "Incorrect Format" );
        res.end( "Incorrect Format. Parameter must follow this format: yyyy-mm-dd" );
    }

    for (var i = 0; i < events.length; i++) {
        var event = JSON.stringify(events[i]);
        var date = events[i].Time.toString().substring(0, 10);
        console.log(date);
        if (date == inputDate[0]) {
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

//Returns events that happened before the provided time and date
app.get('/date/before/:date', function (req, res, next) {
    var input = req.params.date;
    var string = '';
    const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])T(0[012]|1[1-9])\:(0[012345]|1[1-9])\:(0[012345]|1[1-9])\.\d{3}Z$/g;
    const inputDate = input.match(regex);

    if (inputDate == null) {
        console.log( "Incorrect Format" );
        res.end( "Incorrect Format. Parameter must follow this format: yyyy-mm-ddThh:mm:ss.mmmZ" );
    } else {
        for (var i = 0; i < events.length; i++) {
            var event = JSON.stringify(events[i]);
            var date = events[i].Time.toString();
  
            if (date <= inputDate[0]) {
                string += event;
                string += '\n';
            }
        }

        if ( string == '' ) {
            string = 'No results found';
        }

        console.log( string.toString() );
        res.end( string.toString() );
    }
});

//Returns events that happened before the provided time and date
app.get('/date/after/:date', function (req, res, next) {
    var input = req.params.date;
    var string = '';
    const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])T(0[012]|1[1-9])\:(0[012345]|1[1-9])\:(0[012345]|1[1-9])\.\d{3}Z$/g;
    const inputDate = input.match(regex);

    if (inputDate == null) {
        console.log( "Incorrect Format" );
        res.end( "Incorrect Format. Parameter must follow this format: yyyy-mm-ddThh:mm:ss.mmmZ" );
    } else {
        for (var i = 0; i < events.length; i++) {
            var event = JSON.stringify(events[i]);
            var date = events[i].Time.toString();

            if (date >= inputDate[0]) {
                string += event;
                string += '\n';
            }
        }

        if ( string == '' ) {
            string = 'No results found';
        }

        console.log( string.toString() );
        res.end( string.toString() );
    }
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port =  server.address().port
    console.log("App listening at http://%s:%s", host, port)
});

module.exports = server;
