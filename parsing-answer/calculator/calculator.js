// Based on http://en.wikipedia.org/wiki/Recursive_descent_parser

function Calculator(expression) {
  this.expressionToParse = expression.replace(/\s+/g, '').split('');
}

Calculator.prototype.run = function () {
  return this.expression();
}

Calculator.prototype.peek = function () {
  return this.expressionToParse[0] || '';
};

Calculator.prototype.get = function () {
  return this.expressionToParse.shift();
}

/*
  Grammar Rule:
  number = [0-9] {[0-9.]+}
  Hint: remember this means we need to get the first number
    followed by any number of numbers (or the period .)
 */
Calculator.prototype.number = function () {
  // var value = this.expressionToParse.join("");
  // var returnValue = Number(value);
  var numString = "0123456789.";
  var result = "";
  var next = this.peek();
  while(numString.indexOf(next) !== -1) {
    result += this.get();
    next = this.peek();
    if(next == "") break;
  }
  result = Number(result);
  return result;
}

/* Grammar Rule:
  factor = number
          | "(" expression ")"
          | - factor
  Hints:
    - If we see a number, produce a number 
    - If we see a (  then consume it and an expression
    - If we see a "-", return the negative of the factor
 */
Calculator.prototype.factor = function () {
  if(this.peek() === "-") {
    // rule - factor
    this.get();
    return -1 * this.factor();
  } else if(!isNaN(this.peek())) {
    return this.number();
  } else if(this.peek() === "(") {
    this.get();
    var number = this.expression();
    this.get(); // get's closing )
    return number;
  }
}

/*
  term = factor {(*|/) factor}
 */
Calculator.prototype.term = function () {
  var result = this.factor();
  while (this.peek() == '*' || this.peek() == '/') {
    if (this.get() == '*') {
      result *= this.factor();
    } else {
      result /= this.factor();
    }
  }
  return result;
}

/* Grammar Rules
    expression = term {(+|-) term}
*/
Calculator.prototype.expression = function () {
  var result = this.term();
  while (this.peek() == '+' || this.peek() == '-') {
    if (this.get() == '+') {
      result += this.term();
    } else {
      result -= this.term();
    }
  }
  return result;
}