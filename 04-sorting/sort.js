/* 04 Sorting
 *
 * From the live review. Uses ES6:
 *
 *   - Arrow functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 *   - Destructuring assignment: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *   - Default function parameters: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
 *
 * Ashi Krishnan <ashi@gracehopperacademy.com>
 *
 **/


'use strict'

/************* Bubble sort ***************/

describe('bubble sort', function() {
  it('sorts an array of numbers', function() {
    expect(bubble([2, 3, 1])).toEqual([1, 2, 3])
  })

  it('sorts the empty array', function() {
    expect(bubble([])).toEqual([])
  })

  it('sorts random arrays', function() {
    testSort(bubble, function(test) {
      expect(test.output).toEqual(test.sorted)
    })
  })
})


// bubble(array: Array<T>!) -> Array<T>
//
// Sort an array in place with bubble sort. Mutates and returns the array.
function bubble(array) {
  var sorted = true  
  do {
    sorted = true
    let i = array.length; while (--i > 0) {
      if (array[i] < array[i - 1]) {
        // Destrcuturing assignment
        [array[i], array[i - 1]] = [array[i - 1], array[i]]

        // Without that funky syntax.
        // var c = array[i]
        // array[i] = array[i - 1]
        // array[i - 1] = c
        
        sorted = false
      }
    }
  } while (!sorted)
  return array
}



/************* Merge sort ***************/

describe('merge', function() {
  it('merges two sorted arrays into a new sorted array', function() {
    expect(merge([2, 4, 6], [1, 3, 5])).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('merges arrays of unequal length', function() {
    expect(merge([1, 2, 3, 4, 5,], [0])).toEqual([0, 1, 2, 3, 4, 5])
  })
})

// merge(a: Array<T>, b: Array<T>, lessThan: (T, T)->Boolean) -> Array<T>
//
// Perform a sorted merge of the arrays a and b.
function merge(a=[], b=[], lessThan=defaultLessThan) {
  var output = []
  for (var i = 0, j = 0; i < a.length && j < b.length;) {
    if (lessThan(a[i], b[j])) {
      output.push(a[i++])
    } else {
      output.push(b[j++])
    }
  }
  return output
    .concat(a.slice(i))
    .concat(b.slice(j))
}

function defaultLessThan(a, b) { return a < b }

describe('mergeSortIterative', function() {
  it('sorts an array of numbers', function() {
    expect(mergeSortIterative([2, 3, 1])).toEqual([1, 2, 3])
  })

  it('sorts the empty array', function() {
    expect(mergeSortIterative([])).toEqual([])
  })

  it('sorts random arrays', function() {
    testSort(mergeSortIterative, function(test) {
      expect(test.output).toEqual(test.sorted)
    })
  })
})

// mergeSort(array: Array<T>) -> Array<T>
//
// Sort an array with merge sort. Returns a new sorted array.
function mergeSortIterative(array, lessThan=defaultLessThan) {
  if (array.length <= 1) { return array }
  
  // split array into 1-element pieces
  var pieces = array.map(element => [element])

  while (pieces.length > 1) {
    var nextPieces = []
    for (var i = 0; i < pieces.length; i += 2) {
      nextPieces.push(merge(pieces[i], pieces[i + 1], lessThan))
    }
    pieces = nextPieces
  }
  
  return pieces[0]
}

/** This implementation is broken. Can you see why?

// mergeSort(array: Array<T>) -> Array<T>
//
// Sort an array with merge sort. Returns a new sorted array.
function notActuallyMergeSort(array, lessThan=defaultLessThan) {
  if (!array.length) { return [] }
  return array
    .map(function(element) { return [element] })
    .reduce((a, b) => merge(a, b, lessThan))
}

***/



describe('split', function() {
  it('takes an array and splits it in half', function() {
    expect(split([1, 2, 3, 4, 5, 6])).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ])
  })

  it('splits a single element array into [array, []]', function() {
    expect(split([1], [])).toEqual([[1], []])
  })
})

// split(array: Array<T>) -> [Array<T>, Array<T>]
function split(array) {
  if (array.length <= 1) { return [array, []] }
  var halfway = Math.floor(array.length / 2)
  return [array.slice(0, halfway), array.slice(halfway)]
}



describe('mergeSortRecursive', function() {
  it('sorts an array of numbers', function() {
    expect(mergeSortRecursive([2, 3, 1])).toEqual([1, 2, 3])
  })

  it('sorts an array of characters', function() {
    expect(mergeSortRecursive(['z', 'q', 'r', 'v',])).toEqual(['q', 'r', 'v', 'z'])
  })
  
  it('sorts the empty array', function() {
    expect(mergeSortRecursive([])).toEqual([])
  })

  it('calls split at some point', function() {
    var oldSplit = split
    var splitWasCalled = false
    split = function() {
      splitWasCalled = true
      return oldSplit.apply(this, Array.from(arguments))
    }
    mergeSortRecursive([2, 3, 1])
    expect(splitWasCalled).toBeTruthy()

    // restore the old split
    split = oldSplit
  })

  it('sorts random arrays', function() {
    testSort(mergeSortRecursive, function(test) {
      expect(test.output).toEqual(test.sorted)
    })
  })  
})

// mergeSortRecursive(array: Array<T>) -> Array<T>
function mergeSortRecursive(array, lessThan=defaultLessThan) {
  if (array.length <= 1) { return array }
  // split input in half
  var [first, rest] = split(array)

  // mergeSortRecurive each half and merge them
  return merge(mergeSortRecursive(first, lessThan),
               mergeSortRecursive(rest, lessThan),
               lessThan)
}


/******** Test helper *************/

// testSort(sortFunc: (Array<Number>, LessThanEqual)->Array<Number>,
//          verifyFunc: ({input: Array<Number>,
//                        sorted: Array<Number>,
//                        output: Array<Number>,
//                        numComparisons: Int})->Void,
//          nMin: Int, nMax: Int)
//
// Test sortFunction with various random number-filled arrays, from nMin
// to nMax in length. Calls verifyFunc with {input, output, sorted,
// numComparisons}
// after each test.
function testSort(sortFunc, verifyFunc, nMin=5, nMax=1000) {
  for (var n = nMin; n < nMax; ++n) {
    var array = []
    for (var i = 0; i != n; ++i) {
      array.push(Math.random())
    }

    // If unspecified, sort sorts *lexically* (not numerically)
    var sorted = array.slice().sort((x, y) => x - y)

    var numComparisons = 0
    function lessThan(a, b) {
      ++numComparisons
      return a < b
    }
    verifyFunc({input: array,
                sorted: sorted,
                output: sortFunc(array, lessThan),
                numComparisons: numComparisons})
  }
}
