var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Get Customers Histopry Api
module.exports = function getReports(startTime, endTime, resolve, reject) {
	var q = mongoose.models.Reports
	.find({
		$query: {
			createDate: {
				$gt: new Date(parseInt(startTime, 10)),
				$lt: new Date(parseInt(endTime, 10))
			}
		}
	})
	.populate('product')
	.find({}, function(error, results) {
		if (error) {
			reject(error);
		}
		resolve(results);
	});
}
