var Node = require('./node')

var Game = function() {
	this.nodes = {};
	this.startingPoint = null;
}

Game.prototype.addNode = function(title, text) {
	var newNode = new Node(title, text);

	if (this.nodes[title]) throw new Error('There is already a node with that name!');
	if (!this.startingPoint) this.startingPoint = newNode;
	
	this.nodes[title] = newNode;

	return newNode;
};

Game.prototype.getNode = function(title) {
	return this.nodes[title];
};

Game.prototype.connect = function(nodeName1, nodeName2, condition) {
	if (!this.getNode(nodeName1)) throw new Error('There is no node with that name!');

	var node1 = this.getNode(nodeName1);
	var node2 = this.getNode(nodeName2);
	node1.connect(node2, condition);
};

module.exports = Game












