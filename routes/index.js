'use strict';
var express = require('express');
var router = express.Router();
const session = require('express-session');

var sess;
/* GET home page. */
router.get('/', function (req, res) {
	sess = req.session;
	let accessToken = req.cookies.jwt
	sess.accessToken = accessToken
    //if there is no token stored in cookies, the request is unauthorized
    if (!sess.accessToken){
        res.redirect('/login');
    }
    else {
		res.render('index', { title: 'Book Maintenance Page' });
	}
    
});

router.get('/login', function (req, res) {
	//res.clearCookie("jwt");
	sess = req.session;
	let accessToken = req.cookies.jwt
	sess.accessToken = accessToken
	//if there is no token stored in cookies, the request is unauthorized
	if (!sess.accessToken){
	    res.render('login', { title: 'User Authentication' });
	}
	else {
		res.clearCookie("jwt");
		//res.redirect('/'); 
	}	
});

router.get('/create', function (req, res) {
    res.render('book_create', { title: 'Register book' });
});

module.exports = router;
