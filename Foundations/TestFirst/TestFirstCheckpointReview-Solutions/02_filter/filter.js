function filter(arr, func){
	var finalArr = [];

	arr.forEach(function(index){
		if(func(index)){
			finalArr.push(index);
		}
	});

	return finalArr;
}