// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

// Schema Customers History
var customerHistorySchema = new Schema({
	customer: { type: Schema.Types.ObjectId, ref: 'Customers' },
	product: { type: Schema.Types.ObjectId, ref: 'Products' },
	promotion: { type: Schema.Types.ObjectId, ref: 'Promotions' },
	quantity: { type: Number },
	createDate: { type: Date, default: new Date() }
});

// Return model
module.exports = restful.model('CustomersHistory', customerHistorySchema);
