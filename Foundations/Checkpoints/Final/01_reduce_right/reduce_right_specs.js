describe("reduceRight takes an array, starting point, and combining function and applies the values in the array starting from the end", function() {

  it('works with string concatenation', function(){
    var string_concat = function(prev,curr){
      return prev+curr;
    };
    var reducedResult = reduceRight(['o','l','l','e','h'], '', string_concat)
    expect(reducedResult).toEqual("hello");
  });

  it('works with word frequency calculation', function () {
    var words = ['I', 'wish', 'to', 'wish', 'the', 'wish', 'you', 'wish', 'to', 'wish'];
    var reducedResult = reduceRight(words, {}, function (wordFrequencyObj, word) {
      if (wordFrequencyObj[word] === undefined) {
        wordFrequencyObj[word] = 1;
      } else {
        wordFrequencyObj[word]++;
      }
      return wordFrequencyObj;
    });
    expect(reducedResult).toEqual({I: 1, wish: 5, to: 2, the: 1, you: 1});
  });

  it('does not modify the original array', function () {
    var arr = [4,5,6];
    var copyOfOriginal = arr.slice();
    var reducedResult = reduceRight(arr, 0, function (total, num) {
      return total + num;
    });
    expect(reducedResult).toEqual(15);
    expect(arr).toEqual(copyOfOriginal);
  });

});


describe("reduceRight recursive", function(){

  beforeEach(function(){
    spyOn(window, 'reduceRightRecursive').and.callThrough();
  });

  it('works with string concatenation and calls itself', function(){
    var string_concat = function(prev,curr){
      return prev+curr;
    };
    var reducedResult = reduceRightRecursive(['o','l','l','e','h'],'',string_concat)
    expect(reducedResult).toEqual("hello");
    expect(reduceRightRecursive.calls.count()).toBeGreaterThan(4);
  });

  it('works with word frequency calculation and calls itself', function () {
    var words = ['I', 'wish', 'to', 'wish', 'the', 'wish', 'you', 'wish', 'to', 'wish'];
    var reducedResult = reduceRightRecursive(words, {}, function (wordFrequencyObj, word) {
      if (wordFrequencyObj[word] === undefined) {
        wordFrequencyObj[word] = 1;
      } else {
        wordFrequencyObj[word]++;
      }
      return wordFrequencyObj;
    });
    expect(reducedResult).toEqual({I: 1, wish: 5, to: 2, the: 1, you: 1});
    expect(reduceRightRecursive.calls.count()).toBeGreaterThan(8);
  });

  it('does not modify the original array', function () {
    var arr = [4,5,6];
    var copyOfOriginal = arr.slice();
    var reducedResult = reduceRightRecursive(arr, 0, function (total, num) {
      return total + num;
    });
    expect(reducedResult).toEqual(15);
    expect(arr).toEqual(copyOfOriginal);
  });

});