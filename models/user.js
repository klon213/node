
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
/*
schema.methods.encryptPassword = function(password){
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
	.set(function(password){
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function () {
		return this._plainPassword
	});

schema.methods.checkPassword = function (password) {
	return this.encryptPassword(password) === this.hashedPassword;
};
*/
exports.User = mongoose.model('User', schema);
