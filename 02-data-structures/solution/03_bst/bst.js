'use strict';

var BinarySearchTree = function (value) {
	this.value = value;
	this.magnitude = 1;
}

BinarySearchTree.prototype.insert = function(value) {
	var direction = value < this.value ? 'left' : 'right';
	if (this[direction]) this[direction].insert(value);
	else {
		this[direction] = new BinarySearchTree(value);
		this.magnitude++;
	}
};

BinarySearchTree.prototype.contains = function(value) {
	if (this.value === value) return true;
	var direction = value < this.value ? 'left' : 'right';
	if (this[direction]) return this[direction].contains(value);
	else return false;
};

BinarySearchTree.prototype.size = function() {
	return this.magnitude;
};

BinarySearchTree.prototype.depthFirstForEach = function(iterator, option) {
	if (option === 'pre-order') iterator(this.value);
	if (this.left) this.left.depthFirstForEach(iterator, option);
	if (!option || option === 'in-order') iterator(this.value);
	if (this.right) this.right.depthFirstForEach(iterator, option);
	if (option === 'post-order') iterator(this.value);
};

BinarySearchTree.prototype.breadthFirstForEach = function(iterator) {
	var queue = [this];
	var tree;
	while (queue.length) {
		tree = queue.shift();
		iterator(tree.value);
		if (tree.left) queue.push(tree.left);
		if (tree.right) queue.push(tree.right);
	}
};