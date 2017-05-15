// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

// Schema Reports
var reportSchema = new Schema({
	product: { type: Schema.Types.ObjectId, ref: 'Products' },
	quantity: { type: Number },
	totalPrice: { type: Number },
	totalReducePrice: { type: Number },
	createDate: { type: Date, default: new Date() }
});

// Return model
module.exports = restful.model('Reports', reportSchema);
