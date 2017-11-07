var http = require("http");
var sslRedirect = require('heroku-ssl-redirect');
var https = require("https");
var express = require('express');

var tls = require('tls');
var fs = require('fs');

var request = require("request");
var async = require('async');
var bodyParser = require('body-parser');
var path = require("path");
var helmet = require('helmet');

var running_locally = false;
// var request = require('request-ssl');
// request.addFingerprint('api.robinhood.com', '8F:C1:46:FB:19:0A:16:FF:F7:D1:E6:48:5C:74:54:0E:00:FF:36:A6');
// request.addFingerprint('coin-canvas23.herokuapp.com', '08:3B:71:72:02:43:6E:CA:ED:42:86:93:BA:7E:DF:81:C4:BC:62:30');



const FINGERPRINTSET = [
    '08:3B:71:72:02:43:6E:CA:ED:42:86:93:BA:7E:DF:81:C4:BC:62:30'
];

var options = {
    hostname: 'herokuapp.com',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
        'User-Agent': 'Node.js/https'
    }
};

var req = https.request(options, res => {
    res.on('data', d => {
        // console.log("Certificate verified")
    });
})
    .on('error', e => {
        console.error(e);
    });

req.on('socket', socket => {
    socket.on('secureConnect', () => {
        var fingerprint = socket.getPeerCertificate().fingerprint;
        console.log("Authorized: " + socket.authorized)

        // Check if certificate is valid
        if (socket.authorized === false) {
            req.emit('error', new Error(socket.authorizationError));

            return req.abort();

        }

        // Match the fingerprint with our saved fingerprints
        if (FINGERPRINTSET.indexOf(fingerprint) === -1) {
            // Abort request, optionally emit an error event
            req.emit('error', new Error('Fingerprint does not match'));
            return req.abort();
        }
    });
});


// app.get('/', function (request, response) {
//     console.log('Using HTTPS status: '+request.secure)
//     if(request.secure == false)
//     {
        
//     }
//     else{
//         response.sendFile(path.join(__dirname + '/public/index.html'));
//     }
// });















var app = express();
app.disable('x-powered-by');
app.listen(process.env.PORT || 3004, function () {
    console.log('Running REST HTTPS server on port: 3004');
});


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// 
// enable ssl redirect
app.use(sslRedirect());
app.use(helmet());



app.use(express.static(__dirname + '/public'));



// app.get('/', function (request, response) {
//     console.log('Using HTTPS status: '+request.secure)
//     if(request.secure == false)
//     {
        
//     }
//     else{
//         response.sendFile(path.join(__dirname + '/public/index.html'));
//     }
// });



app.post('/token', function (req, res) {


    var username = req.body.username;
    var password = req.body.password;


    var options = {
        method: 'POST',
        url: 'https://api.robinhood.com/api-token-auth/',
        form: { username: username, password: password },
        headers:
        {
            'content-type': 'application/x-www-form-urlencoded'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});
app.get('/tokenWithMFA', function (req, res) {

    var username = req.query.username;
    var password = req.query.password;
    var mfa_code = req.query.mfa_code;

    var options = {
        method: 'POST',
        url: 'https://api.robinhood.com/api-token-auth/',
        form: { username: username, password: password, mfa_code: mfa_code },
        headers:
        { 'content-type': 'application/x-www-form-urlencoded' },
        strictSSL: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);


        res.json(JSON.parse(body));
    });
});

app.get('/quote', function (req, res) {

    

    var ticker = req.query.ticker;

    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/quotes/',
        qs: { symbols: ticker },
        headers:
        { 'cache-control': 'no-cache' },
        strictSSL: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});
app.get('/instruments', function (req, res) {

    var ticker = req.query.ticker;

    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/quotes/',
        qs: { symbols: ticker },
        headers:
        { 'cache-control': 'no-cache' },
        strictSSL: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});


app.get('/accountInfo', function (req, res) {

    var token = req.query.token;

    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/portfolios/',
        headers: { Authorization: 'Token ' + token },
        strictSSL: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});

app.get('/positions', function (req, res) {

    var token = req.query.token;
    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/positions/',
        headers: { Authorization: 'Token ' + token },
        strictSSL: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        // console.log(body);
        res.json(JSON.parse(body));
    });
});


app.get('/instrumentsData', function (req, res) {
    var token = req.query.token;
    // var instrumentUrl = req.query.instrumentUrl;
    var collection = req.query.collection;
    var url;


    function httpGet(url, callback) {
        const options = {
            url: url,
            json: true
        };
        request(options,
            function (err, res, body) {
                callback(err, body);
            }
        );
    }
    async.map(collection, httpGet, function (err, response) {
        if (err) return console.log(err);
        res.send(response);
    });

});

app.get('/allQuotes', function (req, res) {

    console.log(req.secure);


        var token = req.query.token;
        var symbols = req.query.symbols;
        var options = {
            method: 'GET',
            url: 'https://api.robinhood.com/quotes/?symbols=' + symbols,
            headers: { Authorization: 'Token ' + token },
            strictSSL: true

        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.json(JSON.parse(body));
        });
    


});

app.get('/getPortfolioToday', function (req, res) {

    var token = req.query.token;
    var symbols = req.query.symbols;
    var userID = req.query.userID;
    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/portfolios/historicals/' + userID + '/?span=day&interval=5minute',
        headers: { Authorization: 'Token ' + token },
        strictSSL: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});

app.get('/getPortfolioWeek', function (req, res) {

    var token = req.query.token;
    var symbols = req.query.symbols;
    var userID = req.query.userID;

    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/portfolios/historicals/' + userID + '?span=week&interval=10minute',
        headers: { Authorization: 'Token ' + token },
        strictSSL: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});

app.get('/getPortfolioYear', function (req, res) {

    var token = req.query.token;
    var symbols = req.query.symbols;
    var userID = req.query.userID;

    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/portfolios/historicals/' + userID + '/?span=year&interval=day',
        headers: { Authorization: 'Token ' + token },
        strictSSL: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});

app.get('/getPortfolioAll', function (req, res) {

    var token = req.query.token;
    var symbols = req.query.symbols;
    var userID = req.query.userID;

    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/portfolios/historicals/' + userID + '/?span=all',
        headers: { Authorization: 'Token ' + token },
        strictSSL: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});














app.get('/fundamentals', function (req, res) {

    var token = req.query.token;
    var symbol = req.query.symbol;
    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/fundamentals/' + symbol + '/',
        headers: { Authorization: 'Token ' + token },
        strictSSL: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        // console.log(body);
        res.json(JSON.parse(body));
    });
});


app.get('/historicals', function (req, res) {

    var token = req.query.token;
    var symbol = req.query.symbol;
    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/quotes/historicals/' + symbol + '/?interval=day&?span=week',
        headers: { Authorization: 'Token ' + token },
        strictSSL: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});

app.get('/getUserData', function (req, res) {

    var token = req.query.token;
    var symbol = req.query.symbol;
    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/user/',
        headers: { Authorization: 'Token ' + token },
        strictSSL: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});





app.get('/account', function (req, res) {

    var token = req.query.token;
    var symbol = req.query.symbol;
    var options = {
        method: 'GET',
        url: 'https://api.robinhood.com/accounts/',
        headers: { Authorization: 'Token ' + token },
        strictSSL: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});



