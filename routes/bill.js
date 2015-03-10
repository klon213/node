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

	 app.get('/bill/:id', function (req, res, next) {
		 Bills.findById(req.params.id, function (err, bills) {
			 if (!bills) {
			 	next(new HttpError(404, "bill not found"));
			 }
			 next();
			 res.json(bills);
		 });
	 });


	app.post('/bill', function (req, res, next) {
		var bill = new mongoose.models.Bill(req.body);
		next();
		city.save(function(){console.log('saved')});
		res.json(bill);
	});
};


/**
 * Created by root on 3/10/15.
 */
