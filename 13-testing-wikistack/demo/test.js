var Calculator = require('./calculator');
var chai = require('chai');
var expect = chai.expect;
chai.should();

var fs = require('fs');

describe('Calculator', function(){
	var calc;

	beforeEach(function(){
		calc = new Calculator()
	});

	describe('add method', function(){
		it('is a function', function(){
			expect(calc.add).to.be.a('function');
		});

		it('adds two numbers together accurately', function(){
			expect(calc.add(2,2)).to.equal(4);
		});

		it('should correctly put result in output array', function () {
			calc.add(3, 3);
			expect(calc.output).to.have.length(1);
			expect(calc.output[0]).to.be.equal(6);
		});
	});

	describe('logOut method', function() {
		it('should write a file to the filesystem containing the calculator\'s output', function(done){
			calc.add(1,1);
			calc.add(6,6);

			calc.logOutput()
			.then(function(){
				fs.readFile('./output.txt', function(err, contents){
					expect(contents.toString()).to.equal('2,12');
					// done();
				});
			});
		});
	});
});




