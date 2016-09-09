function createCalculator(){

	return {
		total: 0,
		value: function(){
			return this.total;
		},
		add: function(num){
			this.total += num;
		},
		subtract: function(num){
			this.total -= num;
		}
	}	
}