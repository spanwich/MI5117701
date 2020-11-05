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

router.get('/read', function (req, res) {
    res.render('book_read', { title: 'Search book' });
});

router.get('/detail', function (req, res) {
    res.render('book_detail', { title: 'Book Detail' });
});

router.get('/update', function (req, res) {
    res.render('book_update', { title: 'Update book' });
});

router.get('/delete', function (req, res) {
    res.render('book_delete', { title: 'Delete book' });
});

module.exports = router;
