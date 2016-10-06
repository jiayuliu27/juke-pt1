var express = require('express')
var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
	console.log('Request:', req.method, req.url);
	next();
});

console.log('dirname: ', __dirname)

// app.use('/happy', express.static(__dirname + '/client.js'))

app.get('/', function (req, res, next) {
	// res.json(gameData);
	res.sendFile(__dirname + '/index.html', next);
});

var gameData = [{
	name: 'Avalon',
	players: [5,10]
}, {
	name: 'Pandemic',
	players: [3,6]
}, {
	name: 'Basketball',
	players: [1,34]
}];

app.get('/games', function (req, res, next) {
	res.json(gameData);
	// Game.findAll()
	// .then(function(gameRes){
	// 	res.json(gameRes)
	// });
});

app.use(function (err, req, res, next) {
	console.error(err);
	res.status(err.status || 500).end();
});

var port = 3000;
app.listen(port, function () {
	console.log('Reluctantly listening on port', port);
});