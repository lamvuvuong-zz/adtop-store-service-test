// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

// Schema Promotions
var promotionSchema = new Schema({
	reducePrice: { type: Number },
	createDate: { type: Date, default: new Date() }
});

// Return model
module.exports = restful.model('Promotions', promotionSchema);
