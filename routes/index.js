
/*
 * GET home page.
 */
var wine = require('./wines');

exports.index = function(req, res) {
	wine.findAll(function (error, wines) {
		res.render('index', { 
			title: 'Wine-Cellar',
			collection: wines
		});
	});
};
