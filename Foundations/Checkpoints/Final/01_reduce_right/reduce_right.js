function reduceRight (arr, initialValue, iterator) {
	for (var i = arr.length - 1; i >= 0; i--) {
		initialValue = iterator(initialValue, arr[i]);
	}
	return initialValue;
}

function reduceRightRecursive (arr, initialValue, iterator) {
	if (arr.length == 0) return initialValue;
	var shorter = arr.slice(0,-1);
	var lastElem = arr.slice(-1)[0];
	var nextVal = iterator(initialValue, lastElem);
	return reduceRightRecursive(shorter, nextVal, iterator);
}