'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Book Maintenance Page' });
});

router.get('/create', function (req, res) {
    res.render('book_create', { title: 'Register book' });
});

module.exports = router;
