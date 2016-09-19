'use strict';

function mergeSort (array) {
  if (array.length < 2) return array; // base case
  var splits = split(array),
      left = splits[0],
      right = splits[1];
  return merge(mergeSort(left), mergeSort(right)); // merge sorted!
}

function split (array) {
  var center = array.length / 2;
  var left = array.slice(0, center);
  var right = array.slice(center);
  return [left, right];
}

function merge (left, right) {
  var merged = [],
      leftIdx = 0,
      rightIdx = 0;
  while (leftIdx < left.length && rightIdx < right.length) {
    if (left[leftIdx] < right[rightIdx]) {
      merged.push(left[leftIdx++]);
    } else {
      merged.push(right[rightIdx++]);
    }
  }
  for (; leftIdx < left.length; leftIdx++) merged.push(left[leftIdx]);
  for (; rightIdx < right.length; rightIdx++) merged.push(right[rightIdx]);
  return merged;
}

// // from video...
// function merge (left, right) {
//   var merged = [],
//       leftIdx = 0,
//       rightIdx = 0,
//       leftVal,
//       rightVal;
//   // admittedly pretty convoluted, but we do this in order to avoid shift
//   while (leftIdx < left.length || rightIdx < right.length) {
//     leftVal = left[leftIdx];
//     rightVal = right[rightIdx];
//     if (leftVal < rightVal || rightVal === undefined) {
//       merged.push(leftVal);
//       leftIdx++;
//     } else {
//       merged.push(rightVal);
//       rightIdx++;
//     }
//   }
//   return merged;
// }
