function difference (array, arrayTwo) {  

  return array.filter(function(index){
    if(arrayTwo.indexOf(index) === -1){
      return index;
    }
  });

}

function symmetricDiff (array, arrayTwo) {

  var newArray = difference(array, arrayTwo),
  newArray2 =  difference(arrayTwo, array);

  return newArray.concat(newArray2);

}
