'use strict';
var express = require('express');
var router = express.Router();

var request = require('request');

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.query("SELECT * FROM mi5117701;", (err, res) => {
    console.log(err, res);
});

//const sql = require('yesql')('/myproject/sql/',  {type: 'pg'})
const named = require('yesql').pg

//client.connect();
var respond_code = "";

/* POST book insert. */
router.post('/', function (req, res) {
    console.log(req.body);
    var postData = req.body;
    postData.created_at = new Date();
    postData.updated_at = new Date();
    postData.last_modified_date = new Date();
    postData.created_date = new Date();
    client.connect()
    .then(conn => {
      console.log(postData);
	  client.query(named("INSERT INTO books VALUES (0, :title, :author, :isbn, :publisher, :publication_year, :last_modified_date, :created_date, :created_at, :updated_at)")(postData), function (error, results, fields) {
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
          client.end();
        })
        .catch(err => {
          console.log(err); 
          //handle query error
        });
    })
    .catch(err => {
      console.log(err);
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
    client.connect()
    .then(conn => {
      console.log(postData);
      client.query(named("UPDATE books SET title=:title, author=:author, isbn=:isbn, publisher=:publisher, publication_year=:publication_year, last_modified_date=:last_modified_date, updated_at=:updated_at WHERE id=:id")
        (postData), function (error, results, fields) {
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
          client.end();
        })
        .catch(err => {
          console.log(err); 
          //handle query error
        });
    })
    .catch(err => {
      console.log(err);
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
    client.connect()
    .then(conn => {
      console.log(postData);
      client.query(named("DELETE FROM books WHERE id=:id")
        (postData), function (error, results, fields) {
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
          client.end();
        })
        .catch(err => {
          console.log(err); 
          //handle query error
        });
    })
    .catch(err => {
      console.log(err);
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
    client.connect()
    .then(conn => {
      console.log(postData);
      client.query(named("SELECT * FROM books WHERE id=:id")
        (postData), function (error, results, fields) {
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
          client.end();
        })
        .catch(err => {
          console.log(err); 
          //handle query error
        });
    })
    .catch(err => {
      console.log(err);
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
    client.connect()
    .then(conn => {
      console.log(postData);
      client.query(named("select * FROM books")
        (postData), function (error, results, fields) {
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
          client.end();
        })
        .catch(err => {
          console.log(err); 
          //handle query error
        });
    })
    .catch(err => {
      console.log(err);
      //handle connection error
    });
    //res.send(respond_code);
});
module.exports = router;
