var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

var schema= new Schema({

	name: {
		type: String,
		required: true,
		unique: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});


exports.City = mongoose.model('City', schema);
