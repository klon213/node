var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

var schema= new Schema({

	name: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});


exports.Photos = mongoose.model('Photos', schema);
