var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('winedb', server);

db.open(function(err, db) {
	if(!err) {
		console.log("Connected to 'winedb' database");
		db.collection('wines', {strict: true}, function(err, collection) {
			if(err) {
				console.log("The 'wines' collection doesn't exist. Creating it with sample data");
				populateDB();
			}
		});
	}
});

exports.findById = function(id, callback) {
	console.log('Retrieving wine: ' + id);
	db.collection('wines', function(error, collection) {
		collection.findOne({'_id': new BSON.ObjectID(id)}, function(error, item) {
			if (error) callback(error);
			else callback(null, item);
		});
	});
};

exports.findAll = function(callback) {
	console.log('Retrieving all wines');
	db.collection('wines', function(error, collection) {
		collection.find().toArray(function(error, items) {
			if (error) callback(error);
			else callback(null, items);
		});
	});
};

exports.addWine = function(req, callback) {
	var wine = req.body;
	console.log('Adding wine: ' + JSON.stringify(wine));
	db.collection('wines', function(err, collection) {
		collection.insert(wine, {safe: true}, function(err, result) {
			if(err) {
				console.log('Error inserting ' + id)
				callback(error, 'An error has occurred');
			}
			else {
				console.log('Success: ' + JSON.stringify(result[0]));
				callback(null, 'successfully inserted');
			}
		});
	});
};

exports.updateWine = function(req, callback) {
	var id = req.params.id;
	var wine = req.body;
	console.log('Updating wine: ' + JSON.stringify(wine));
	db.collection('wines', function(err, collection) {
		collection.update({'_id': new BSON.ObjectID(id)}, wine, {safe: true}, function(err, result) {
			if(err) {
				console.log('Error updating ' + id)
				callback(err, 'An error has occurred');
			}
			else {
				console.log('Success : ' + JSON.stringify(result[0]));
				callback(null,'successfully inserted');
			}
		});
	});
};

exports.deleteWine = function(req, callback) {
	var id = req.params.id;
	console.log('Deleting Wine: ' + id);
	db.collection('wines', function(err, collection) {
		collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function(err, result) {
			if(err) {
				console.log('Error removeing ' + id);
				callback(error,'An error has occurred');
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				callback(null, 'successfully deleted');
			}
		});
	});
};

/*
 * Populate Database with sample data
 */

var populateDB = function() {
	var wines = [
	{
		name: "CHATEAU DE SAINT COSME",
		year: "2009",
		grapes: "Grenache/Syrah",
		country: "France",
		region: "Southern Rhone",
		descripition: "The aromas of fruit and spice...",
		picture: "saint_cosme.jpg"
	},
	{
		name: "LAN RIOJA CRIANZA", 
		year: "2006",
		grapes: "Tempranillo",
		country: "Spain",
		region: "Rioja",
		description: "A resurgence of interest in boutique vinegar",
		picture: "lan_rioja.jpg"
	}];

	db.collection('wines', function(err, collection) {
		collection.insert(wines, {safe: true}, function(err, result) {
			if(err) {
				console.log("Error while populating");
			} else {
				console.log("Successfully populated");
			}
		});
	});
};
