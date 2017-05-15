// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

// Schema Customers
var customerSchema = new Schema({
	name: { type: String },
	phone: { type: String },
	createDate: { type: Date, default: new Date() }
});

// Return model
module.exports = restful.model('Customers', customerSchema);
