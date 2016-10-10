var chai = require('chai');
chai.should();
var expect = chai.expect;
var fs = require('fs');

var Calculator = require('./calculator.js');

describe('Calculator', function () {
	var calc;

	beforeEach(function () {
		calc = new Calculator();
	});

	describe('add method', function () {

		it('should exist', function () {
			// example without using chai:
			// if (typeof calc.add !== 'function') {
			// 	throw new Error('add is not a function!');
			// }

			// example of making assertions using 'should' instead of 'expect'
			// calc.add.should.be.a('function');

			expect(calc.add).to.be.a('function');

		});

		it('should correctly add two numbers', function() {
			expect(calc.add(2, 2)).to.be.equal(4);
		});

		it('should correctly put result in output array', function () {
			calc.add(3, 3);
			expect(calc.output).to.have.length(1);
			expect(calc.output[0]).to.be.equal(6);
		});
	});

	describe('subtract method', function() {
		it('should exist', function () {
			expect(calc.subtract).to.be.a('function');
		});

		it('should correctly add two numbers', function() {
			expect(calc.subtract(2, 2)).to.be.equal(0);
		});

		it('should correctly put result in output array', function () {
			calc.subtract(3, 1);
			expect(calc.output).to.have.length(1);
			expect(calc.output[0]).to.be.equal(2);
		});
	});

	describe('logOutput method', function() {
		afterEach(function(){
			// this removes the output text file after our tests are done
			fs.unlink('./output.txt', function(err){
				if(err) console.error(err);
			});
		});

		it('should write a file to the file system with output', function(done) {
			calc.add(2, 2);
			calc.add(2, 5);
			
			calc.logOutput()
			.then(function() {
				fs.readFile('./output.txt', function(err, contents) {
					expect(contents.toString()).to.be.equal('4,7');
				});
				done();
			});

		})
	});


});