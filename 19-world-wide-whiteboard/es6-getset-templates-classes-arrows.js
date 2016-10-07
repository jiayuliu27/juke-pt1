'use strict'

// 2. Getters, setters, and computed properties
//
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Defining_getters_and_setters
//
let clock = {
  // Short syntax for Object.defineProperty
  get time() {
    // Bad clock.
    return this._now++
  },
  set time(newValue) {
    this._now = Math.sqrt(newValue) / 2
  },
  _now: 0
}

console.log('tick', clock.time)
console.log('tock', clock.time)
clock.time = 50
console.log('ticktock?', clock.time)

// Computed properties (we didn't get here in the livecode, but...)
//
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
//

// Equivalent to:
//   obj = {}
//   obj[clock.time] = 'hellooooo'
let obj = {
  [clock.time]: 'hellooooo'
}
console.log('a reverse clock object', obj)



// 3. String template literals
// 
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
//
console.log(`the time is now ${clock.time}`)
//console.log(`the frobnicator is ${frobnicator}`)

function tag(...someStuff) {
  console.log('tag function got', ...someStuff)
}

tag `Hello, the time is now ${clock.time}`

//let something = sh `git commit -a -m "done"`


// 4. Classes
//
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
//
function Cat(type='calico') {
  this.type = type
}

Cat.prototype.emit = function() {
  console.log('meow')
}


class Sloth {
  constructor(type='lazy') {
    this.type = type
  }

  emit() {
    console.log('...')
  }
}

console.log('the cat goes')
new Cat().emit()

console.log('the sloth says')
new Sloth().emit()

console.log("the sloth's prototypal emit",
            Sloth.prototype.emit)


const Lion = class {
  constructor(type='angry', color) {
    this.type = type
    this.color = color
  }

  emit() {
    console.log('rawr!')
    return this
  }
}

console.log(new Lion(undefined, 'blue').emit())

class Liger extends Lion {
  constructor(type='strange') {
    super(type)
  }

  emit() {
    super.emit()
    // Equivalent to:
    // Lion.prototype.emit.apply(this)
    console.log('...but strangely')
    return this
  }
}

console.log(new Liger().emit())

console.log("Liger's proto:", Liger.prototype)
console.log("Liger's proto's proto:",
            Object.getPrototypeOf(Liger.prototype));



// 5. Arrow functions
//
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
//

// This will never work (can't non-lexically bind this)
(() => console.log(this.foo)).apply({foo: 2})

class SomeClass {
  constructor() {
    this.factor = 2
  }
  
  doAThing() {
    /*
      This prints:

      false 0 [ false, true, false ]
      true 1 [ false, true, false ]
      false 2 [ false, true, false ]

      Why?
    */
    [1, 2, 3]
      // lexically bound this is a lifesaver here.
      .map(x => x % this.factor == 0)
      .forEach(console.log)
  }
}

new SomeClass().doAThing()



// 6. Symbols
//
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
//

// Guaranteed to be globally unique
let unique = Symbol()

let objWithASymbolAsAKey = {
  // Will never collide with anything
  [unique]: 'hello'
}

console.log(Object.keys(objWithASymbolAsAKey))
// -> []
//   Symbols don't show up in Object.keys


// 7. Generators
//
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
//

// 8. Proxies
//
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
//
