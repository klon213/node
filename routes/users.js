//var express = require('express');
//var router = express.Router();
var mongoose = require('../libs/mongoose');
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;

module.exports = function(app) {
	/* GET users listing. */
	app.get('/users', function (req, res, next) {
		User.find({}, function (err, users) {
			if (err) return next(err);
			next();
			res.json(users);
		});

	});



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

	/* add new userlisting. */

	/*		var user = new mongoose.models.User(userData);
	 		user.save(callback)
	 */
	app.post('/users', function (req, res, next) {
		var user = new mongoose.models.User(req.body);
		next();
		res.json(user);
		user.save(function(){console.log('saved')});

	});

	app.put('/users/:id', function (req, res, next){
		console.log(req.params.id);
		var query = {_id: req.params.id};
		User.findOneAndUpdate(query, {username: req.body.username}, function(err, users){
			console.log(users);
			if (!users) {
				console.log('error');
				next(new HttpError(404, "user not found"));
			}
			next();
			res.json(users);
		});

	});

	app.delete('/users/:id', function (req, res, next){
		console.log(req.params.id);
		//var query = {_id: req.params.id};
		User.findByIdAndRemove(req.params.id, function(err, users){
			console.log(users);
			if (!users) {
				next(new HttpError(404, "user not found"));
			}else {
				next();
				res.json(users);
			}
		});
	});
};
//module.exports = router;
