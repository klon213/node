var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

var schema= new Schema({

	title: {
		type: 'string',
		ref: 'user'
	},

	user_id: {
		type: Schema.ObjectId,
		ref: 'user'
	},

	created: {
		type: Date,
		default: Date.now
	}
});


exports.Albums = mongoose.model('Albums', schema);
