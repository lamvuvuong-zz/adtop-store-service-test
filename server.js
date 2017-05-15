// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var getCustomerHistoryApi = require('./api/customer-history');
var createReportApi = require('./api/report');
var getReportApi = require('./api/report-history');
var config = require('./config/config');
var CronJob = require('cron').CronJob;

// MongoDB
mongoose.connect(config.api);

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
// Link demo: http://localhost:3000/api/customers-history/0911222333
app.get('/api/customers-history/:phone', function(req, res) {
	var promise = new Promise(function(resolve, reject) {
		getCustomerHistoryApi(req.params.phone, resolve, reject);
	}).then(function(result) {
		res.send(result);
	})
	.catch(function(reason) {
		res.send(reason);
	});
});

// Link demo: http://localhost:3000/api/reports-history/1431584231000/1494861449579
app.get('/api/reports-history/:startTime/:endTime', function(req, res) {
	var promise = new Promise(function(resolve, reject) {
		getReportApi(req.params.startTime, req.params.endTime, resolve, reject);
	}).then(function(result) {
		res.send(result);
	})
	.catch(function(reason) {
		res.send(reason);
	});
});

// Cron Job - Report
var cronJobReport = new CronJob({
	cronTime: config.cronTime,
	timeZone: config.timeZone,
	start: false,
	onTick: function() {
		console.log('Cron Job - Report: ' + new Date());
		var promise = new Promise(function(resolve, reject) {
			var currentTime = new Date();
			var startTime = new Date();
			var startTime = new Date(startTime.setHours(startTime.getHours() - 1));
			createReportApi(startTime, currentTime, resolve, reject);
		}).then(function(result) {
			console.log('Cron Job - Report is success.');
		})
		.catch(function(reason) {
			console.log('Cron Job - Report is error.');
			console.log(reason);
		});
	}
});


// Create Seed Data
var createModels = require('./models');
var promise = new Promise(function(resolve, reject) {
	createModels(resolve, reject);
}).then(function(results) {
	// Start server
	cronJobReport.start();
	app.listen(3000);
	console.log('API is running on port 3000');
}).catch(function(reason) {
	res.send(reason);
});
