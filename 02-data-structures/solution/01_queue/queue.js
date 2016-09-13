function Queue(array) {
  this.array = array || []  
  this.head = 0
  this.tail = 0
}

Queue.prototype.enqueue = function(item) {
  this.array[this.tail++] = item
}

Queue.prototype.dequeue = function() {
  if (!this.size()) {
    return undefined
  }
  const item = this.array[this.head]
  this.array[this.head] = null
  this.head = this.head + 1
  return item
}

Queue.prototype.size = function() {
  return this.tail - this.head
}
