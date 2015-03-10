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



	app.post('/city', function (req, res, next) {
		var city = new mongoose.models.City(req.body);
		next();
		res.json(city);
		city.save(function(){console.log('saved')});
	});

	app.put('/city/:id', function (req, res, next){
		console.log(req.params.id);
		var query = {_id: req.params.id};
		Cities.findOneAndUpdate(query, {name: req.body.name}, function(err, cities){
			console.log(cities);
			if (!cities) {
				console.log('error');
				next(new HttpError(404, "city not found"));
			}
			next();
			res.json(cities);
		});

	});

	app.delete('/city/:id', function (req, res, next){
		console.log(req.params.id);
		Cities.findByIdAndRemove(req.params.id, function(err, cities){
			console.log(cities);
			if (!cities) {
				next(new HttpError(404, "city not found"));
			}else {
				next();
				res.json(cities);
			}
		});
	});

};


