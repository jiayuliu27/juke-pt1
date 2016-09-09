var alternate = function (fn) {
    var wasJustInvoked = false;
    return function () {
        if (!wasJustInvoked) {
            fn();
        }
        wasJustInvoked = !wasJustInvoked; 
    };
};

var twice = function (fn) {
    var numInvoked = 0;
    return function () {
        numInvoked++;
        if (numInvoked < 3) {
            return fn();
        } else {
            return 0;
        }
    };
};