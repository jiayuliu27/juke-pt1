'use strict';

// // big O
// function bubbleSort (array) { // O(n*n) O(n^2)
//   var sorted = false; // O(1)
//   for (var end = array.length; !sorted; end--) { // O(n*n)
//     sorted = true; // O(1)
//     for (var j = 0; j < end; j++) { // O(n*1)
//       if (!inOrder(array, j)) { // O(1)
//         swap(array, j); // O(1)
//         sorted = false; // O(1)
//       }
//     }
//   }
//   return array; // O(1)
// }

// function inOrder (array, index) { // O(1)
//   if (index === array.length - 1) return true; // O(1)
//   return array[index] < array[index + 1]; // O(1)
// }

// function swap (array, index) { // O(1)
//   var oldLeftValue = array[index]; // O(1)
//   array[index] = array[index + 1]; // O(1)
//   array[index + 1] = oldLeftValue; // O(1)
// }

function bubbleSort (array) {
  var sorted = false;
  // keep doing the inner loop until it's sorted
  for (var end = array.length; !sorted; end--) { // passes
    sorted = true; // assume until proven incorrect
    // go down and swap things
    for (var j = 0; j < end; j++) { // bubbling
      if (!inOrder(array, j)) {
        swap(array, j);
        sorted = false;
      }
    }
  }
  return array;
}

function inOrder (array, index) { // pure function
  if (index === array.length - 1) return true;
  return array[index] < array[index + 1];
}

function swap (array, index) { // side effects
  var oldLeftValue = array[index];
  array[index] = array[index + 1];
  array[index + 1] = oldLeftValue;
}

// In-place algorithms use only a small, constant amount of extra space.
// Bubble sort is an in-place algorithm;
// it has good space complexity at O(1), but bad time complexity O(n^2).
