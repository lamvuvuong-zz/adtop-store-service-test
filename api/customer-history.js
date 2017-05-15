var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Get Customers Histopry Api
module.exports = function getCustomerHistory(phone, resolve, reject) {
	var q = mongoose.models.CustomersHistory
	.find()
	.populate('product')
	.populate('promotion')
	.populate({
		path: 'customer',
		match: { phone: phone }
	})
	.find({}, function(error, results) {
		if (error) {
			reject(error);
		}
		resolve(results.filter((item) => item.customer !== null));
	});
}
