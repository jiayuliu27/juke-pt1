// // basic http server
// var http = require('http');

// http.createServer(function(request, response) {
//   var headers = request.headers;
//   var method = request.method;
//   var url = request.url;

//   request.on('error', function(err) {
//     console.error(err);
//   });

//   response.on('error', function(err) {
//     console.error(err);
//   });

//   response.statusCode = 200;
//   response.setHeader('Content-Type', 'application/json');
//   // Note: the 2 lines above could be replaced with this next one:
//   // response.writeHead(200, {'Content-Type': 'application/json'})

//   var responseBody = {
//     headers: headers,
//     method: method,
//     url: url
//   };

//   response.write(JSON.stringify(responseBody));
//   response.end();
//   // Note: the 2 lines above could be replaced with this next one:
//   // response.end(JSON.stringify(responseBody))
// }).listen(8080, function() {
// 	console.log("server is listening on port 8080");
// });

// // basic express app
// var express = require('express');
// var app = express();
// var port = 1234;

// app.listen(port, function () {
// 	console.log("server is listening on port 1234");
// });

// app.use(function(req, res){
// 	var echoObj = {
//       headers: req.headers,
//       method: req.method,
//       url: req.url,
//       body: req.body
//     };

// 	res.json(echoObj);
// });

// // some basic routes
// app.get('/example', function (request, response) {
// 	response.send('this is a response to GET\n')
// });

// app.post('/example', function (request, response) {
// 	response.send('this is a response to POST\n')
// });

// app.all('/example', function (request, response) {
// 	response.send('this is a response to ALL requests\n');
// });

// // the order in which you put routes is important!
// app.get('/example', function (request, response) {
// 	response.send('firstly\n')
// });

// app.get('/example', function (request, response) {
// 	response.send('secondly\n')
// });

// // a simple CR ('Create/Read') app example
// var dumbledores = [],
// 		id = 0;

// app.get('/data', function (req, res) {
// 	res.json(dumbledores);
// });

// app.post('/data', function (req, res) {
// 	dumbledores.push({
// 		name: 'Dumbledore',
// 		id: id++
// 	});
// 	res.status(201).json(dumbledores[dumbledores.length - 1]);
// });

// // example of how to use 'next'
// app.get('/example', function (request, response, next) {
// 	if (request.headers['user-agent'].split('/')[0] === "curl") {
// 		response.status(403).send("This is as far as you get, to go, curl...");
// 	} else {
// 		next();
// 	}
// });

// app.use('/example', function (request, response, next) {
// 	console.log("Hit my middleware!");
// });

// app.get('/example', function (request, response, next) {
// 	response.send("Hello, browser user!");
// });

// // params string example:
// app.get('/times2/:number', function (request, response, next) {
// 	var number = request.params.number
// 	var result = number1 * 2;
// 	response.json(result);
// });

// // query string example:
// app.get('/times2', function (request, response, next) {
// 	var number1 = request.query.number1;
// 	var number2 = request.query.number2;
// 	var result1 = number1 * 2;
// 	var result2 = number2 * 2;
// 	response.json(request.query);
// });

// // adding a body parser and accessing a request's body:
// var bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// app.post('/example', function (request, response, next) {
// 	var resMessage = 'Thank you for this: ' + request.body.message;
// 	response.send(resMessage);
// });

// // example of .use to create middleware
// app.use(function (request, response, next) {
// 	console.log('This request\'s method:', request.method);
// 	response.hi = "Hello";
// 	next();
// });

// // .use versus .all:
// app.use('/example', function (request, response) {
// 	// console.log('This request\'s method:', request.method);
// 	response.send('This is a USE response: ' + response.hi);
// });

// app.all('/example', function (request, response) {
// 	console.log('This request\'s method:', request.method);
// 	response.send('This is an ALL response');
// });

// // error handling
// app.get('/roulette', function (request, response, next) {
// 	var n = Math.random();
// 	if (n > 0.5) response.send('phew! no error this time...');
// 	else {
// 		var error = new Error();
// 		next(error);
// 	}
// });

// app.use(function (request, response, next) {
// 	console.log('normally, i would match');
// 	next();
// });

// // this is error handling middleware simply because it declares four arguments!
// app.use(function (error, request, response, next) {
// 	console.log('uh ohh...');
// 	response.send(error);
// });

// // router example
// var birdRouter = express.Router();

// birdRouter.get('/hens', function (request, response, next) {
// 	response.send('cluck');
// });
// birdRouter.get('/crows', function (request, response, next) {
// 	response.send('caw');
// });

// app.use('/birds', birdRouter);
