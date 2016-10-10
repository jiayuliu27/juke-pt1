var Bluebird = require('bluebird');
var fs = require('fs');

// fs.writeFile('./log.txt', '1, 2, 3', function(err) {
//    if (err) console.log(err);
// })

var writeFile = Bluebird.promisify(fs.writeFile);

var Calculator = function() {
	this.output = [];
};

Calculator.prototype.add = function(n1, n2) {
	var result = n1 + n2;
	this.output.push(result);
	return result;
};

Calculator.prototype.subtract = function(n1, n2) {
	var result = n1 - n2;
	this.output.push(result);
	return result;
};

Calculator.prototype.logOutput = function() {
	return writeFile('./output.txt', this.output.toString());
};

module.exports = Calculator;