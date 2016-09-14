// This file makes extensive use of the short-circuiting boolean
// operators && and ||
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Short-Circuit_Evaluation

function LinkedList() {
    this.head = this.tail = null
}

// splice(a: Node?, b: Node?) -> [Node?, Node?]
//
// Put b immediately after a. This will detach any current tail of a and
// head of b. Returns and and b
function splice(a, b) {
  if (a) { a.next = b }      // a && (a.next = b)
  if (b) { b.previous = a }  // b && (b.previous = a)
  return [a, b]
}

LinkedList.prototype.addToHead = function(value) {
  // ES6 Destructuring assignment
  //
  //   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  //
  // This unpacks the first two elements of the array
  // returned from splice and assigns them to the vars head
  // and _ (_ is just another variable name; I'm using it
  // here because we don't really need the second value,
  // but I want to note that it's there).
  var [head, _] = splice(new Node(value), this.head)

  // The above is equivalent to:
  //   var headAndTail = splice(new Node(value), this.head)
  //   var head = headAndTail[0],
  //          _ = headAndTail[1]
  //
  // It's just shorter.
  
  this.head = head
  this.tail = this.tail || this.head
}

LinkedList.prototype.addToTail = function(value) {
  var [_, tail] = splice(this.tail, new Node(value))
  this.tail = tail
  this.head = this.head || this.tail
}

LinkedList.prototype.removeHead = function() {
  const head = this.head
  this.head = head && head.next
  
  if (this.head) {
    this.head.previous = null
  } else {
    this.tail = null
  }
  
  // The above if statement is equivalent to:
  //
  // this.head && (this.head.previous = null)
  // this.head || (this.tail = null)
  
  return head && head.value
}

LinkedList.prototype.removeTail = function() {
  const tail = this.tail
  this.tail = tail && tail.previous

  // Perhaps excessive cleverness:
  this.tail && (this.tail.next = null)
  this.tail || (this.head = null)

  // The above pair of operations is equivalent to:
  //
  // if (this.tail) {
  //   this.tail.next = null
  // } else {
  //   this.head = null
  // }
  return tail && tail.value
}

LinkedList.prototype.search = function(value) {
  if (typeof value === 'function') {
    var predicate = value
  } else {
    var predicate = function(nodeValue) {
      return nodeValue == value
    }
  }
  
  for (let p = this.head; p; p = p.next) {
    if (predicate(p.value)) { return value }
  }

  /**
  You might also use a while loop:
 
  var p = this.head
  while (p) {
    if (predicate(p.value)) { return value }
    p = p.next
  }
  **/
  
  return null
}

LinkedList.prototype.alternateSearchFunction = function(predOrVal) {
  // The `?` is the ternary operator:
  //   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  const predicate = predOrVal instanceof Function? // Or: typeof predOrVal === 'function'
        predOrVal
        : value => value == predOrVal

  // `value => value == predOrVal` is an arrow function
  // Rough equivalent: function(value) { return value === predOrValue }
  //
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  for (let p = this.head; p; p = p.next) {    
    if (predicate(p.value)) { return p.value }
  }
  return null
}


function Node(value, next, prev) {
  this.value = value
  this.next = next || null
  this.previous = prev || null
}
