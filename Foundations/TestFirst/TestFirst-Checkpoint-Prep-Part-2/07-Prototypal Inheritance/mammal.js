function Mammal(name){
	this.name = name;
	this.offspring = [];
}

Mammal.prototype.sayHello = function(){
	return "My name is " + this.name + ", I'm a Mammal";
}

Mammal.prototype.haveBaby = function(){
	var child = Object.create(Mammal.prototype);
	child.name = "Baby " + this.name;
	this.offspring.push(child);
	return child;
}

function Cat(name, color){
	Mammal.call(this, name);
	this.color = color;
}

Cat.prototype = Object.create(Mammal.prototype);

Cat.prototype.constructor = Cat;

Cat.prototype.haveBaby = function(color){
	var myCat = new Cat("Baby " + this.name, color);
	this.offspring.push(myCat);
	return myCat
}
