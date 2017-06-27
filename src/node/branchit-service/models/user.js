var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;
let userSchema = new Schema({
	id: String,
	name: String,
	email: String,
	password: String,
	activated:Boolean,
	admin: Boolean
})
userSchema.plugin(findOrCreate);

// set up a mongoose model
module.exports = mongoose.model('User', userSchema);
