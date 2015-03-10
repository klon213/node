var mongoose = require('../libs/mongoose');
var Cities = require('../models/city').City;
var HttpError = require('../error').HttpError;

module.exports = function(app) {
	/* GET users listing. */

	app.get('/city', function (req, res, next) {
		Cities.find({}, function (err, photos) {
			if (err) return next(err);
			next();
			res.json(photos);
		});
	});

	app.get('/city/:id', function (req, res, next) {
		Cities.findById(req.params.id, function (err, cities) {
			if (!cities) {
				next(new HttpError(404, "city not found"));
			}
			next();
			res.json(cities);
		});

	});


/*
	app.get('/users/:id', function (req, res, next) {
		User.findById(req.params.id, function (err, users) {
			if (!users) {
				console.log('error');
				next(new HttpError(404, "user not found"));
			}
			//	if(err) return next(err);
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


