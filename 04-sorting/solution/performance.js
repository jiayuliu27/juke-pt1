// Uncomment to run performance tests (check your console)

// for (var i = 9; i <= 12; i++) {
//   var numItems = Math.pow(2, i);
//   var nativeTestArray = [];

//   for(var j = 0; j < numItems; j++) {
//     var rand = Math.floor(Math.random() * numItems);
//     nativeTestArray.push(rand);
//   }

//   var bTestArray = nativeTestArray.slice(0);
//   var mTestArray = nativeTestArray.slice(0);

//   console.time(numItems + ' native');
//   nativeTestArray.sort(function(a, b){ return a - b; });
//   console.timeEnd(numItems + ' native');

//   console.time(numItems + ' bubble');
//   bubbleSort(bTestArray);
//   console.timeEnd(numItems + ' bubble');

//   console.time(numItems + ' merge');
//   mergeSort(mTestArray);
//   console.timeEnd(numItems + ' merge');
// }
