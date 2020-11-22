'use strict';
var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

const mariadb = require('mariadb');

const db_host = process.env.DB_HOST; 
const db_user = process.env.DB_USER; 
const db_pswd = process.env.DB_PSWD; 
const db_name = process.env.DB_NAME; 

var respond_code = "";

/* POST book insert. */
router.post('/', function (req, res) {
    console.log(req.body);
    var postData = req.body;
    postData.created_at = new Date();
    postData.updated_at = new Date();
    postData.last_modified_date = new Date();
    postData.created_date = new Date();
	console.log(db_user);
    mariadb.createConnection({host: db_host, user: db_user, password: db_pswd, database: db_name})
    .then(conn => {
      console.log(postData);
      conn.query({ namedPlaceholders: true, sql: "INSERT INTO books VALUES (0, :title, :author, :isbn, :publisher, :publication_year, :last_modified_date, :created_date, :created_at, :updated_at)"},
        postData, function (error, results, fields) {
           if (error) throw error;
           console.log(results.insertId); // Auto increment id
           respond_code = JSON.stringify(results);
           res.end(JSON.stringify(results));
        })
        //"INSERT INTO books value (?,?,?,?,?,?,?,?,?);",
        //postData)
        .then(rows => {
          res.send(rows);
          console.log(rows); // [{ "1": 1 }]
          conn.end();
        })
        .catch(err => {
          console.log(err); 
          //handle query error
        });
    })
    .catch(err => {
      console.log(err);
      var err = new Error('Not Found');
      err.status = 404;
	  res.send(err);
      //handle connection error
    });
    //res.send(respond_code);
});

/* PUT book update. */
router.put('/:id', function (req, res) {
    console.log(req.body);
	console.log(req.params.id);
    var postData = req.body;
    postData.created_at = new Date();
    postData.updated_at = new Date();
    postData.last_modified_date = new Date();
    postData.created_date = new Date();
	postData.id = req.params.id;
    mariadb.createConnection({host: db_host, user: db_user, password: db_pswd, database: db_name})
    .then(conn => {
      console.log(postData);
      conn.query({ namedPlaceholders: true, sql: "UPDATE books SET title=:title, author=:author, isbn=:isbn, publisher=:publisher, publication_year=:publication_year, last_modified_date=:last_modified_date, updated_at=:updated_at WHERE id=:id"},
        postData, function (error, results, fields) {
           if (error) throw error;
           console.log(results.insertId); // Auto increment id
           respond_code = JSON.stringify(results);
           res.end(JSON.stringify(results));
        })
        //"INSERT INTO books value (?,?,?,?,?,?,?,?,?);",
        //postData)
        .then(rows => {
          res.send(rows);
          console.log(rows); // [{ "1": 1 }]
          conn.end();
        })
        .catch(err => {
          console.log(err); 
          //handle query error
        });
    })
    .catch(err => {
      console.log(err);
      var err = new Error('Not Found');
      err.status = 404;
	  res.send(err);
      //handle connection error
    });
    //res.send(respond_code);
});

/* DELETE book destroy. */
router.delete('/:id', function (req, res) {
    console.log(req.body);
	console.log(req.params.id);
    var postData = req.body;
    postData.created_at = new Date();
    postData.updated_at = new Date();
    postData.last_modified_date = new Date();
    postData.created_date = new Date();
	postData.id = req.params.id;
    mariadb.createConnection({host: db_host, user: db_user, password: db_pswd, database: db_name})
    .then(conn => {
      console.log(postData);
      conn.query({ namedPlaceholders: true, sql: "DELETE FROM books WHERE id=:id"},
        postData, function (error, results, fields) {
           if (error) throw error;
           console.log(results.insertId); // Auto increment id
           respond_code = JSON.stringify(results);
           res.end(JSON.stringify(results));
        })
        //"INSERT INTO books value (?,?,?,?,?,?,?,?,?);",
        //postData)
        .then(rows => {
          res.send(rows);
          console.log(rows); // [{ "1": 1 }]
          conn.end();
        })
        .catch(err => {
          console.log(err); 
          //handle query error
        });
    })
    .catch(err => {
      console.log(err);
      var err = new Error('Not Found');
      err.status = 404;
	  res.send(err);
      //handle connection error
    });
    //res.send(respond_code);
});

/* GET book info. */
router.get('/:id', function (req, res) {
    console.log(req.body);
	console.log(req.params.id);
    var postData = req.body;
    postData.created_at = new Date();
    postData.updated_at = new Date();
    postData.last_modified_date = new Date();
    postData.created_date = new Date();
	postData.id = req.params.id;
    mariadb.createConnection({host: db_host, user: db_user, password: db_pswd, database: db_name})
    .then(conn => {
      console.log(postData);
      conn.query({ namedPlaceholders: true, sql: "SELECT * FROM books WHERE id=:id"},
        postData, function (error, results, fields) {
           if (error) throw error;
           console.log(results.insertId); // Auto increment id
           respond_code = JSON.stringify(results);
           res.end(JSON.stringify(results));
        })
        //"INSERT INTO books value (?,?,?,?,?,?,?,?,?);",
        //postData)
        .then(rows => {
          res.send(rows);
          console.log(rows); // [{ "1": 1 }]
          conn.end();
        })
        .catch(err => {
          console.log(err); 
          //handle query error
        });
    })
    .catch(err => {
      console.log(err);
      var err = new Error('Not Found');
      err.status = 404;
	  res.send(err);
      //handle connection error
    });
    //res.send(respond_code);
});

/* GET book list. */
router.get('/', function (req, res) {
    console.log(req.body);
	console.log(req.params.id);
    var postData = req.body;
    postData.created_at = new Date();
    postData.updated_at = new Date();
    postData.last_modified_date = new Date();
    postData.created_date = new Date();
	postData.id = req.params.id;
    mariadb.createConnection({host: db_host, user: db_user, password: db_pswd, database: db_name})
    .then(conn => {
      console.log(postData);
      conn.query({ namedPlaceholders: true, sql: "select * FROM books"},
        postData, function (error, results, fields) {
           if (error) throw error;
           console.log(results.insertId); // Auto increment id
           respond_code = JSON.stringify(results);
           res.end(JSON.stringify(results));
        })
        //"INSERT INTO books value (?,?,?,?,?,?,?,?,?);",
        //postData)
        .then(rows => {
          res.send(rows);
          console.log(rows); // [{ "1": 1 }]
          conn.end();
        })
        .catch(err => {
          console.log(err); 
          //handle query error
        });
    })
    .catch(err => {
      console.log(err);
      var err = new Error('Not Found');
      err.status = 404;
	  res.send(err);
      //handle connection error
    });
    //res.send(respond_code);
});
module.exports = router;
