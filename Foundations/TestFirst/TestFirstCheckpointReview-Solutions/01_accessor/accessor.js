function accessor(obj){
	return function(prop, value){
		if(value === undefined){
			return obj[prop];
		} else {
			obj[prop] = value;
		}
	};
}