var fs = require('fs');
var Bluebird = require('bluebird');

var Calculator = function() {
	this.output = [];
};

Calculator.prototype.add = function(a, b) {
	var results = a+b;
	this.output.push(results);
	return results;
};

var writeFile = Bluebird.promisify(fs.writeFile);

Calculator.prototype.logOutput = function() {
	return writeFile('./output.txt', this.output.toString());
};

module.exports = Calculator;