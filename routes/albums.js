var mongoose = require('../libs/mongoose');
var Albums = require('../models/albums').Albums;
var HttpError = require('error').HttpError;

module.exports = function(app) {
	/* GET albums listing. */

	app.get('/albums', function (req, res, next) {
		Albums.find({}, function (err, albums) {
			if (err) return next(err);
			next();
			res.json(albums);
		});

	});

	app.get('/albums/:id', function (req, res, next) {
		Albums.findById(req.params.id, function (err, albums) {
			if (!photos) {
				next(new HttpError(404, "album not found"));
			}
			res.json(albums);
		});
		next();

	});

	app.post('/albums', function (req, res, next) {
		var album = new mongoose.models.Albums(req.body);
		next();
		res.json(album);
		album.save(function(){console.log('saved')});

	});
};


