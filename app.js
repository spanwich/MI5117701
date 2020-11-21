'use strict';
require('dotenv').config()
const debug = require('debug');
const express = require('express');
const path = require('path');
const passport = require('passport');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const users = require('./routes/users');
const database = require('./routes/database');

const app = express();

const {login, refresh} = require('./authentication')
//const {google, callback, success, failure} = require('./googleauth')
const {verify} = require('./middleware')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//set passport strategy
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://mi5117701.herokuapp.com/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
	console.log("access token: ", accessToken);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(session({secret: 'ssshhhhh', expires: Date.now() + process.env.REFRESH_TOKEN_SECRET}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/database',verify, database);
app.use('/login', login)
app.use('/refrsh', refresh)

//app.use('/auth/google',google);
app.get('/auth/google', function(request, response, next) {
    passport.authenticate('google', {scope: ['profile', 'email']})(request, response, next);
});
//app.use( '/auth/google/callback',callback);
app.get('/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        //successRedirect: '/auth/google/success',
        //failureRedirect: '/auth/google/failure'
		console.log(req);
		console.log("login callback process");
		jwt.sign({userId: req.user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'5 min'}, (err, token) => {
			if(err){
				res.sendStatus(500);
			} else {
				//res.json({token});
				res.cookie("jwt", token, {secure: false, httpOnly: false})
				res.redirect(302, '/');
				//res.send()
			}
		});	
    }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
console.log(process.env);
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port)
    debug('Express server listening on port ' + server.address().port);
});
