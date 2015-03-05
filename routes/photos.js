//var express = require('express');
//var router = express.Router();
var mongoose = require('../libs/mongoose');
var Photos = require('../models/photos').Photos;
var HttpError = require('error').HttpError;

module.exports = function(app) {
	/* GET users listing. */

	app.get('/photos', function (req, res, next) {
		Photos.find({}, function (err, photos) {
			if (err) return next(err);
			res.json(photos);
		});
	});

	app.get('/photos/:id', function (req, res, next) {
		Photos.findById(req.params.id, function (err, users) {
			if (!photos) {
				next(new HttpError(404, "user not found"));
			}
			res.json(users);
		});
	});

	app.post('/photos', function (req, res, next) {
		var photo = new mongoose.models.Photos(req.body);
		res.json(photo);
		photo.save(function(){console.log('saved')});
	});
};


