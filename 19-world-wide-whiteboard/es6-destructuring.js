// ES6
'use strict'

// 0. const and let

// let wontLetUDown = 'rick astley'
// function nowWithLet() {
//   console.log(wontLetUDown)
//   let wontLetUDown = 'beyonce'
// }
// nowWithLet()

// function blockScoping() {
//   if (true) {
//     let iHaveBlockScope = 'yep'
//   }
//   // Reference error: iHaveBlockScope
//   // is not defined.
//   console.log(iHaveBlockScope)
// }
// blockScoping()


const myArray = [1, 2, 3]
myArray.push(10)
console.log('myArray is:', myArray)
// myArray = []  // throws

const notIncrementable = 5
// notIncrementable++ // ->  x = x + 1, throws


function deeperBlockScoping() {
  let canUSeeMe = 'yes i can'
  if (true) {
    console.log('canUSeeMe', canUSeeMe)
  }
}
deeperBlockScoping()








// 1. Destructuring
//   (and default arguments)

let array = [1, 2, 3]
let [x, y, z] = array



let ashi = {
  brain: {
    thoughts: [
      'want food',
      'need yoga',
      'scattered',
    ],
    curious: true,
  },
  heart: {
    isOpen: true
  }
}

let {heart} = ashi
console.log(heart)

var {brain} = ashi
console.log(brain)

let {heart: anotherHeart} = ashi
console.log('anotherHeart', anotherHeart)

let {heart: {isOpen}} = ashi
console.log('isOpen', isOpen)



let {
  brain: {
    thoughts: [
      primaryThought,
        ...otherThoughts
    ]
  }
} = ashi
console.log('my primary thought',
            primaryThought)
console.log('my other thoughts',
            otherThoughts)



// "once"
for (let i = 0; i != 1; ++i) {
  let {liver} = ashi
  console.log('liver?', liver)
}


let {liver={status: 'ennnnnnh'}}
    = ashi
console.log('liver? (with default)=',
            liver)


// Rest operator
let primes = [2, 3, 5, 7, 11, 13, 17, 19]

function restElementMustBeTheLastElementInArray() {
  // So this fails:
  // let [...theFirstPrimes, theLastPrime] = primes
  console.log('the first primes and the last',
              theFirstPrimes,
              theRestOfThePrimes)
}


console.log('unspread primes', primes)
console.log('spread primes', ...primes)

function showsItsArgs(...args) {
  console.log(`  I recieved ${args.length} args`)
  console.log('  args is an array:', Array.isArray(args))
  args.forEach((arg, i) =>
               console.log('    argument', i, arg))
}
console.log('with primes'); showsItsArgs(primes)
console.log('with ...primes'); showsItsArgs(...primes)

function takesLotsOfArgsThenDestructuresThem(...args) {
  // Args is an array, so you can destructure it
  let [x, y, ...rest] = args
}

// function f(x) {
  
// }

// f(2)
//   x = 2

function saySomething({
  message,
  header = "Tati is awesome"
}) {
  console.log(`****** ${header} ******`)
  console.log('saySomething:', message)
}

// let {message} = 'hello'

saySomething('hello')
saySomething({message: 'hello'})
saySomething({header: "Y'all are awesome too.",
              message: "it's true"})

// For example (JSX),
//
// List({items}) =>
//   <ul>{items.map(item => <li>{item}</li>)}</ul>

function log(level='INFO', ...message) {
  console.log(`[${level}]`, ...message)
}

log(undefined, 'yo')
log('ERROR', 'ahhhhhh!')



