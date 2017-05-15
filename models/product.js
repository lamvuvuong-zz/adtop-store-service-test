// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema Products
var productSchema = new mongoose.Schema({
	name: { type: String },
	prices: { type: Array },
	createDate: { type: Date, default: new Date() }
});

// Return model
module.exports = restful.model('Products', productSchema);
