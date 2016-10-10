// ES5
'use strict'

// 0. var

var iAmHoisted = 'hello'
function someFunc() {    
  console.log('x is', iAmHoisted);
  var iAmHoisted = 25;
}
someFunc()



function functionScoping() {
  if (true) {
    var iHaveFunctionScope = 'yep'
  }
  console.log(iHaveFunctionScope)
}
functionScoping()











// 1. Destructuring
var array = [1, 2, 3]
var x = array[0]
var y = array[1]
var z = array[2]


let self = {
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

var heart = self.heart
console.log(heart)
