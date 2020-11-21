﻿'use strict';
var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

/* GET users listing. */
router.get('/', function (req, res) {
    console.log(req.body.link);
	var var_path = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=25.01356939010485,%20121.54060382089233&radius=2000&type=restaurant&key=AIzaSyA-Vm3BkWjVRO0JSgPYF351J6J3931zN5k';
    Request.get(var_path, (error, response, body) => {
		if(error) {
			return console.dir(error);
		}
		jsonresult = JSON.parse(body);
		var list_places = jsonresult.results;
		var counter = list_places.length;
		var output = Math.floor(Math.random() * counter);
		place_id = list_places[output].place_id;
		console.log(place_id);
		
		var detail_path = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=name,rating,formatted_phone_number,url&key=AIzaSyA-Vm3BkWjVRO0JSgPYF351J6J3931zN5k';
		Request.get(detail_path, (error, response, body) => {
			if(error) {
				return console.dir(error);
			}
			jsonresult = JSON.parse(body);
			var destination = jsonresult.results.url;
			console.log(destination);
			
			res.send(body);
		});
	});
});

module.exports = router;