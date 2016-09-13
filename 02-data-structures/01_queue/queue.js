function Queue(array) {
  this.array = array || []  
  this.head = 0
  this.tail = 0
}

Queue.prototype.enqueue = function(item) {
  this.array[this.tail++] = item
}

Queue.prototype.dequeue = function(item) {
  return this.size() ? this.array[this.head++] : undefined  
}

Queue.prototype.size = function() {
  return this.tail - this.head
}

