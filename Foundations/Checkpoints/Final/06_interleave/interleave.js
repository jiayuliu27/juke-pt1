function interleave () {

	var argsArr = Array.prototype.slice.call(arguments);

	var maxLength = argsArr.reduce(function (currentMax, str) {
		return Math.max(str.length, currentMax);
	}, 0);

	var interleavedString = '';

    for (var i = 0; i < maxLength; i++) {
        /* Nested for loop */
        //for (var j = 0; j < strs.length; j++) {
        //    if (strs[j][i]) {
        //        interleavedString += strs[j][i];
        //    }
        //}

        /* For each */
        argsArr.forEach(function (str) {
            if (str[i]) {
                interleavedString += str[i];
            }
        });
    }

    return interleavedString;
}