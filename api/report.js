var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;
var Report = require('../models/report');

// Create Reports Api
module.exports = function createReport(startTime, currentTime, resolve, reject) {
	mongoose.models.CustomersHistory
	.find({
		$query: {
			createDate: {
				$gt: startTime,
				$lt: currentTime
			}
		}
	})
	.sort('product')
	.populate('product')
	.populate('promotion')
	.find({}, function(error, results) {
		if (error) {
			reject(error);
		}

		var reports = [];

		for (var i = 0; i < results.length; i++) {
			if (reports.length === 0 || results[i - 1].product._id !== results[i].product._id) {
				var totalPrice = results[i].quantity * getPriceProduct(results[i].product.prices, results[i].createDate);
				reports.push(getReport({
					product: results[i].product._id,
					quantity: results[i].quantity,
					totalPrice: totalPrice,
					totalReducePrice: totalPrice - results[i].promotion.reducePrice
				}));
			} else {
				reports[reports.length - 1] = getReport(reports[reports.length - 1], results[i]);
			}
		}
		Report.create(reports, function(err, result) {
			if (err) {
				reject(err);
			} else {
				resolve({reports: reports, results: results});
			}
		});

	});
}

// Sum History
function getReport(report, customerHistory) {
	if (!customerHistory) {
		return report;
	}
	var product = customerHistory.product;
	var promotion = customerHistory.promotion;
	var createDate = customerHistory.createDate;
	var quantity = customerHistory.quantity;
	var price = quantity * getPriceProduct(product.prices, createDate);
	report = {
		product: product._id,
		quantity: report.quantity + quantity,
		totalPrice: report.totalPrice + price,
		totalReducePrice: report.totalReducePrice + price - promotion.reducePrice
	}
	return report;
}

// Get Price Product Time Payment
function getPriceProduct(prices, datetime) {
	var price = 0;
	for (var i = prices.length - 1; i >= 0; i--) {
		if (new Date(prices[i].startDate) <= new Date(datetime)) {
			price = prices[i].price;
			return price;
		}

	}
}
