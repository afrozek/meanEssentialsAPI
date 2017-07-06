

//==============================================================
// DEPENDENCIES
//==============================================================
var express = require('express');
var app = express();
var path = require('path');
var port = 3200;
var bodyParser = require('body-parser'); // reads post contents
var morgan = require('morgan'); // logs all requests to console
var mongoose = require('mongoose'); //ORM 
var dbName = "meanEssentials"



//==============================================================
// CONFIG
//==============================================================

var env = "development";
// var env = "production";




//==============================================================
// API
//==============================================================


// handle CORS requests(cross origin resource sharing)
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET,POST');
	res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// log all requests to console
app.use(morgan('dev'));

//routes



var usersApi = require('./api/users.api.js')(app,express);
app.use('/api/users', usersApi);

var budgetsApi = require('./api/budgets.api.js')(app,express);
app.use('/api/budget', budgetsApi);







if(env == "production"){
	console.log("production mode");
	app.use(express.static(__dirname + '/dist'));

	app.get('*',function(req,res){
		res.sendFile(path.join(__dirname + '/dist/index.html'));
	});
}
else{
	console.log("development mode");
	app.use(express.static(__dirname + '/src'));
	app.use(express.static(__dirname + '/bower_components'));

	// app.get('/',function(req,res){
	// 	res.sendFile(path.join(__dirname + '/src/index.html'));
	// });

	app.get('*',function(req,res){
		res.sendFile(path.join(__dirname + '/src/index.html'));
	});
}







//==============================================================
// SERVER START
//==============================================================

mongoose.connect("mongodb://localhost:27017/" + dbName);

app.listen(port, function(){
	console.log("listening on port: " + port);
});







