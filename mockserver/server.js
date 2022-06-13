var express = require('express');
var app = express();
var {expressjwt} = require('express-jwt');
var jwks = require('jwks-rsa');
var axios = require("axios").default;
var jwt_decode = require("jwt-decode").default;
var dbo = require("./db/conn");


var port = process.env.PORT || 8080;

// Needed for auth0 to include username in jwt.
const AUTH0_NAMESPACE_URL = 'https://sample-namespace.com/';

dbo.connectToServer(function(err) {
    if (err) console.error(err);

});

// Middleware to check if access_token is correct.
var jwtCheck = expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'YOUR-AUTH0-DEV-LINK'
    }),
    audience: 'test-api',
    issuer: 'YOUR-AUTH0-DEV-LINK',
    algorithms: ['RS256']
});


app.get('/authorized', [jwtCheck], function(req, res) {

    console.log("User " + phone_number + " (token ok) requests authorised resources.")

    // Decodes JWT token:
    const jwt_object = jwt_decode(req.headers["authorization"]);

    // Gets phone number from access_token jwt object property 'phone_number':
    const phone_number = jwt_object[AUTH0_NAMESPACE_URL + 'phone_number'];

    let db_connect = dbo.getDb("loyalty-app");
    let users = db_connect.collection("users");


    // If not an user yet, add to database:
    users.updateOne({
        username: '+48507189848'
    }, {
        $setOnInsert: {
            username: '+48507189848',
            points: '0',
            joined: new Date()
        }
    }, {
        upsert: true
    })

    users.findOne({
        "username": phone_number
    }).then((document) => {
        res.send(JSON.stringify(document));
    });
});


app.get('/test', function(req, res) {
    res.send('test-resource for unauthorized users');
})

app.listen(port);