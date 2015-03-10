var mongoose = require('../libs/mongoose');
var Bills = require('../models/bill').Bill;
var HttpError = require('../error').HttpError;

module.exports = function(app) {
	/* GET users listing. */

	app.get('/bill', function (req, res, next) {
		Bills.find({}, function (err, photos) {
			if (err) return next(err);
			next();
			res.json(photos);
		});
	});
	/*
	 app.get('/city/:id', function (req, res, next) {
	 Cities.findById(req.params.id, function (err, users) {
	 if (!photos) {
	 next(new HttpError(404, "user not found"));
	 }
	 next();
	 res.json(users);
	 });

	 });
	 */
	app.post('/city', function (req, res, next) {
		var city = new mongoose.models.City(req.body);
		next();
		res.json(city);
		city.save(function(){console.log('saved')});
	});
};


/**
 * Created by root on 3/10/15.
 */
