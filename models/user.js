
var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

var schema= new Schema({
	first_name: {
		type: String,
		unique: false,
		required: true
	},
	last_name: {
		type: String,
		required: true,
		unique: false
	},
	birth_date: {
		type: String,
		required: true,
		unique: false
	},
	city_id: {
		type: Schema.ObjectId,
		ref: 'city'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

exports.User = mongoose.model('User', schema);
