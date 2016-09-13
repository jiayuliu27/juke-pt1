function LinkedList() {
    this.head = this.tail = null
}

// splice(a: Node?, b: Node?) -> [Node?, Node?]
//
// Put b immediately after a. This will detach any current tail of a and
// head of b.
function splice(a, b) {
  a && (a.next = b)
  b && (b.previous = a)
  return [a, b]
}

LinkedList.prototype.addToHead = function(value) {
  var [head, _] = splice(new Node(value), this.head)
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
  this.head && (this.head.previous = null)
  this.head || (this.tail = null)
  return head && head.value
}

LinkedList.prototype.removeTail = function() {
  const tail = this.tail
  this.tail = tail && tail.previous
  this.tail && (this.tail.next = null)
  return tail && tail.value
}

LinkedList.prototype.search = function(predOrVal) {
  const pred = predOrVal instanceof Function? predOrVal
        : value => value == predOrVal
  for (let p = this.head; p; p = p.next) {
    if (pred(p.value)) { return p.value }
  }
  return null
}

function Node(value, next, prev) {
  this.value = value
  this.next = next || null
  this.previous = prev || null
}
