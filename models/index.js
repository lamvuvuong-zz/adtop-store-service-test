var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var Schema = mongoose.Schema;
var Customer = require('./customer');
var Product = require('./product');
var Promotion = require('./promotion');
var CustomersHistory = require('./customers-history');
var productData = require('../seed-data/products.json');
var customerData = require('../seed-data/customers.json');
var promotionData = require('../seed-data/promotions.json');
var customersHistoryData = require('../seed-data/customers-history.json');

module.exports = function(resolveSeed, rejectSeed) {

	var promiseCustomersHistory = new Promise(function(resolve, reject) {
		Promise.all([
			new Promise(seedProducts),
			new Promise(seedCustomers),
			new Promise(seedPromotions)
		]).then((results) => {
			resolve(results);
		}).catch(reason => {
			reject(reason);
		});
	}).then(function(results) {
		seedCustomersHistory(results, resolveSeed, rejectSeed);
	}).catch(reason => {
		rejectSeed(reason);
	});

	// Seed Data Customers History
	function seedCustomersHistory(results, resolve, reject) {
		customersHistoryData = customersHistoryData.map(function(item) {
			var indexProduct = Math.floor((Math.random() * results[0].length));
			var indexCustomer = Math.floor((Math.random() * results[1].length));
			var indexPromotion = Math.floor((Math.random() * results[2].length));
			item.product = { '_id' : ObjectID(results[0][indexProduct]._id || '') };
			item.customer = { '_id' : ObjectID(results[1][indexCustomer]._id || '') };
			item.promotion = { '_id' : ObjectID(results[2][indexPromotion]._id || '') };
			return item;
		});

		CustomersHistory.create(customersHistoryData, function(err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	}

	// Seed Data Products
	function seedProducts(resolve, reject) {
		Product.find({}, (errCheck, resultCheck) => {
			if (resultCheck.length === 0) {
				Product.create(productData, function(err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			} else {
				resolve(resultCheck);
			}
		});
	}

	// Seed Data Customers
	function seedCustomers(resolve, reject) {
		Customer.find({}, (errCheck, resultCheck) => {
			if (resultCheck.length === 0) {
				Customer.create(customerData, function(err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			} else {
				resolve(resultCheck);
			}
		});
	}

	// Seed Data Promotions
	function seedPromotions(resolve, reject) {
		Promotion.find({}, (errCheck, resultCheck) => {
			if (resultCheck.length === 0) {
				Promotion.create(promotionData, function(err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			} else {
				resolve(resultCheck);
			}
		});
	}
}
