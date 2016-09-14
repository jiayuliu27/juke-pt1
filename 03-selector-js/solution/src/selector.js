var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
  
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // your code here
  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  // depth-first traversal
  if (matchFunc(startEl)) resultSet.push(startEl);

  if (startEl.children.length > 0) {
    var childrenArr = [].slice.call(startEl.children);

    childrenArr.forEach(function (child) {
      resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, child));
    });
  }

  // breadth-first traversal
  // var currentEl = startEl;
  // var queue = [startEl];
  // while (queue.length) {
  //   currentEl = queue.shift();
  //   if (matchFunc(currentEl)) resultSet.push(currentEl);
  //   if (currentEl.children) {
  //     for (var i = 0; i < currentEl.children.length; i++) {
  //       queue.push(currentEl.children[i]);
  //     }
  //   }
  // } 

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
//
var selectorTypeMatcher = function(selector) {
  if (selector[0] === "#") return "id";
  if (selector[0] === ".") return "class";
  if (selector[0] !== "." && selector.indexOf(".") > -1) {
    return "tag.class";
  } else {
    return "tag";
  }
};


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function (element) {
      return element.getAttribute('id') === selector.substr(1);
    };

  } else if (selectorType === "class") {
    matchFunction = function (element) {
      var elementClassArr = element.className.split(" ");

      for (var i = 0; i < elementClassArr.length; i++) {
        if (elementClassArr[i] === selector.substr(1)) return true;
      };

      return false;
    }
    
  } else if (selectorType === "tag.class") {
    matchFunction = function (element) {
      var selectorArr = selector.split(".");
      var elementClassArr = element.className.split(" ");

      var tagBool = element.tagName.toLowerCase() == selectorArr[0];

      var classBool = false;
      for (var i = 0; i < elementClassArr.length; i++) {
        if (elementClassArr[i] == selectorArr[1]) {
          classBool = true;
          break;
        }
      };
      return tagBool && classBool;
    };
    
  } else if (selectorType === "tag") {
    matchFunction = function (element) {
      return element.tagName.toLowerCase() === selector;
    };
    
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
