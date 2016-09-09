function vowelsCount (str) {
	// // for loop approach
	// str = str.toLowerCase();
	// var vowels = ['a', 'e', 'i', 'o', 'u'];
	// var count = 0;
	// for (var i = 0; i < str.length; i++) {
	// 	if (vowels.indexOf(str[i]) != -1) count++;
	// }
	// return count;

	// // regex approach
	// var result = str.match(/[aeiou]/ig);
	// return result ? result.length : 0;

  // reduce approach
  str = str.toLowerCase().split('');
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  return str.reduce(function(acc, elem) {
    return (vowels.indexOf(elem) != -1) ? acc + 1 : acc;
  }, 0)
}