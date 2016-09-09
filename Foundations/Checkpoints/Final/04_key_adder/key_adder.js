var keyAdder = function () {
    var sum = 0;

    for (var key in this) {
        if (this.hasOwnProperty(key) && typeof this[key] === 'number') {
            sum += this[key];
        }
    }

    return sum;
};