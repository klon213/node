var mongoose = require('./libs/mongoose');
var async = require('async');

async.series([
	open,
	dropDatabase,
	requireModels,
	createCities
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
	require('./models/city');
	require('./models/user');
	require('./models/bill');

	async.each(Object.keys(mongoose.models), function(modelName, callback){
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
}

function createCities(callback){
	require('./models/city');
	var cities = [
		{name: 'London'},
		{name: 'L.A.'},
		{name: 'Tokyo'}
	];
	async.each(cities, function(userData, callback){
		var city = new mongoose.models.City(userData);
		city.save(createUsers(city, createBills), callback);
	}, callback);
}

function createUsers(city, callback){
	require('./models/user');
	var userData = {
		first_name: city.name + " citizen",
		last_name: city.name + " citizen last name",
		city_id: city._id,
		birth_date: "10.01.1990"
	};
	var user = new mongoose.models.User(userData);
	user.save(callback(user, callback));
}

function createBills(user, callback){
	require('./models/bill');
	var billData = {
		order_name: user.first_name + "'s bill",
		amount: "10",
		user_id: user._id
	};
	var bill = new mongoose.models.Bill(billData);
	bill.save(function(){process.exit()});
}