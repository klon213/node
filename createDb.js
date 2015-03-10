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
	require('./models/albums');
	require('./models/photos');

	async.each(Object.keys(mongoose.models), function(modelName, callback){
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
}

function createUsers(callback){
	require('./models/user');

	var users = [
		{username: 'suiseiseki1', password: 'suiseiseki'},
		{username: 'souseiseki', password: 'suiseiseki'},
		{username: 'suiginto', password: 'suiginto'}
	];

	async.each(users, function(userData, callback){
		var user = new mongoose.models.User(userData);
		user.save(createAlbums(user, createPhotos), callback);
	}, callback);

}

function createAlbums(user,  callback){
	require('./models/albums');
	var albumData = {
		title: user.username + "'s test album",
		user_id: user._id
	};
	var album = new mongoose.models.Albums(albumData);
	album.save(callback(album, callback));
}

function createPhotos(album, callback){
	require('./models/photos');
	var photos = [
		{album_id: album._id, url: 'http://static.guim.co.uk/sys-images/Film/Pix/pictures/2008/08/15/eraserhead460.jpg'},
		{album_id: album._id, url: 'http://athenacinema.com/wp-content/uploads/2014/08/eraserhead-2.jpg'},
		{album_id: album._id, url: 'https://kintsukuroi.files.wordpress.com/2013/02/eraserhead-photo-5.jpg'}
	];

	async.each(photos, function(photoData, callback){
		var photo = new mongoose.models.Photos(photoData);
		photo.save();
	}, callback);
}