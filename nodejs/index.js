var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


// create instance of express
var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({secret: 'secret',
                 resave: false,
                 saveUninitialized: true,}));


// start server
var server = app.listen(4300, function () {
    console.log('Listening on port %d', server.address().port)
});


////////////////////////////////
// Passport.js & SAML config
// http://www.passportjs.org/
////////////////////////////////

var passport = require('passport');
var saml = require('passport-saml');
var fs = require('fs');

passport.serializeUser(function(user, done) {
  console.log('-----------------------------');
  console.log('serialize user');
  console.log(user);
  console.log('-----------------------------');
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  console.log('-----------------------------');
  console.log('deserialize user');
  console.log(user);
  console.log('-----------------------------');
  done(null, user);
});

var saml = new saml.Strategy({
  entryPoint: '[SAML v2 Login URL]',
  callbackUrl: 'http://[NODE PUBLIC IP]:4300/login/callback',
  logoutUrl: '[SAML v2 Logout URL]',
  metadataUrl: '[SAML v2 Metadata URL]',
  issuer: '[ISSUER]',
  identifierFormat: null,
  nameIDFormat: '[SAML v2 NameIDFormat]',
  decryptionPvk: fs.readFileSync(__dirname + '/certs/key.pem', 'utf8'),
  privateCert: fs.readFileSync(__dirname + '/certs/key.pem', 'utf8'),
  validateInResponseTo: false,
  disableRequestedAuthnContext: true
}, function(profile, done) {
    return done(null, profile);
});

passport.use('saml', saml);

// initialize passport
app.use(passport.initialize({}));
app.use(passport.session({}));


//////////////
// ROUTES
//////////////

app.get('/',
  function(req, res) {
    res.send('Test Home Page');
  }
);

// your own metadata link!
app.get('/metadata',
  function(req, res) {
    res.type('application/xml');
    res.status(200).send(
      saml.generateServiceProviderMetadata(
        fs.readFileSync(__dirname + '/certs/cert.pem', 'utf8'),
        fs.readFileSync(__dirname + '/certs/cert.pem', 'utf8')
      )
    );
  }
);

// login handler
app.get('/login',
  function (req, res, next) {
    console.log('-----------------------------');
    console.log('/Start login handler');
    next();
  },
  passport.authenticate('saml'),
);

// callback handler
app.post('/login/callback',
  function (req, res, next) {
    console.log('-----------------------------');
    console.log('/Start login callback ');
    next();
  },
  passport.authenticate('saml'),
  function (req, res) {
    console.log('-----------------------------');
    console.log('login call back dumps');
    console.log(req.user);
    console.log('-----------------------------');
    res.send('Log in Callback Success');
  }
);

// logout hander
// TODO: clears the connect.sid cookie, but doesn't really log out...
app.get('/logout',
  function (req, res) {
    console.log('-----------------------------');
    console.log('/Start logout handler');
    req.session.destroy(function () {
      res.clearCookie('connect.sid', {path: '/'}).status(200).send('Ok.');
    });
  }
);

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Nope.  Try again.")
});
