var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

var schema= new Schema({
	order_name: {
		type: String,
		unique: false,
		required: true
	},
	amount: {
		type: String,
		required: true,
		unique: false
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

exports.Bill = mongoose.model('Bill', schema);