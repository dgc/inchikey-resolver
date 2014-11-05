
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var product = require('./routes/product');
var supplier = require('./routes/supplier');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    
    var suppliers = require('./store').obtain('suppliers');    

    suppliers.add({
        id: 'x_chemical',
        name: "Chemical X Manufacturing",
        address: "1234, Over There St.",
        contact: "Mr Ben Zene",
        phone: "(123) 456-7890"
    });
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/entities/:inchikey', product.show);
app.post('/post', product.create);
app.get('/suppliers', supplier.index);
app.get('/suppliers/:supplier', supplier.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
