
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var cons = require('consolidate');
var wine = require('./routes/wines');
var rest = require('./routes/rest');

var app = express();

//assign the dust engine to .dust files
app.engine("dust", cons.dust);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'dust');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(err, req, res, next) {
	res.send(500, 'Something Broke!');
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/rest/wines/', rest.findAll);
app.get('/rest/wines/:id', rest.findById);
app.post('/rest/wines', rest.addWine);
app.put('/rest/wines/:id', rest.updateWine);
app.delete('/rest/wines/:id', rest.deleteWine);

app.get('/users', user.list);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
