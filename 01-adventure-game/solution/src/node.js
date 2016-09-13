var Connection = require('./connection')

var Node = function(title, text) {
	this.title = title;
	this.text = text;
	this.connections = [];
	this.conditions = {};
}

Node.prototype.connect = function(node, conditionStr) {
	if (this.conditions[conditionStr]) throw new Error('There is already a connection with that name');
	var newConnection = new Connection(node, conditionStr);
	this.connections.push(newConnection);
	this.conditions[conditionStr] = newConnection;
};

module.exports = Node
