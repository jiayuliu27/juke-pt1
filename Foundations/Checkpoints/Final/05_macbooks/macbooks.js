var Laptop = function (year, hd) {
    this.year = year;
    this.hd = hd;
};

Laptop.prototype.checkSpecs = function () {
    return 'Year: ' + this.year + ', HD: ' + this.hd;
};

var Macbook = function (year, hd, color) {
    Laptop.apply(this, [year, hd]);
    this.color = color;
};

var extendWithObjectCreate = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

var extendWithNewKeyword = function (child, parent) {
    child.prototype = new parent();
};

