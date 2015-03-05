//var User = require('./models/user').User;
var mongoose = require('./libs/mongoose');
var async = require('async');

async.series([
	open,
	dropDatabase,
	requireModels,
	createUsers
],
	function(err){
		mongoose.disconnect();
	}
);


function open(callback) {
	mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels(callback){
	require('./models/user');

	async.each(Object.keys(mongoose.models), function(modelName, callback){
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
}

function createUsers(callback){
	require('./models/user');

	var users = [
		{username: 'suiseiseki', password: 'suiseiseki'},
		{username: 'souseiseki', password: 'suiseiseki'},
		{username: 'suiginto', password: 'suiginto'}
	];

	async.each(users, function(userData, callback){
		var user = new mongoose.models.User(userData);
		user.save(callback);
	}, callback);

}

