// String template literals
function greeting(name) {
  return `Hello, ${name.toUpperCase()}, its nice today.`
}

console.log(greeting('ashi'))


// Arrow functions

var array = [1, 2, 3, 4, 5]
var odd = array.filter(function(element) {
  return element % 2
})
var evens = array.filter(e => e % 2 === 0)
var divisibleByThree = array.filter(e => {
  return e % 3 === 0
})

console.log(odd)
console.log(divisibleByThree)

function Game() {
  this.livingCells = 5000000
  setInterval(() => {
    console.log(this)
    console.log(this.livingCells)
  }, 500)
}

new Game()

// Arrow functions:

// Immediate return (concise form)
(x, y, z) => x + y + z

// Block body
(x, y, z) => { return x + y + z }

// DON'T bind this
x => this.value === x  // this refers to this in the
                       // enclosing scope.


