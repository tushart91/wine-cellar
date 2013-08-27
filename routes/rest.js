var wines = require('./wines')

exports.findAll = function(req, res) {
	wines.findAll(function(error, wine_collection) {
		res.send({
			collection: wine_collection
		});
	});
}

exports.findById = function(req, res) {
	wines.findById(req.params.id, function(error, wine) {
		res.send({
			collection: wine
		});
	});
}

exports.addWine = function(req, res) {
	wines.addWine(req, function(error, response) {
		res.send({
			'status' : response
		});
	});
};

exports.updateWine = function(req, res) {
	wines.updateWine(req, function(error, response) {
		res.send({
			'status': response
		});
	});
};

exports.deleteWine = function(req, res) {
	wines.deleteWine(req, function(error, response) {
		res.send({
			'status': response
		});
	});
};
