/* REPEAT SOLUTION */

function repeat(str, multi){
  var finalString = "";
  for(multi; multi > 0; multi--){
    finalString += str;
  }
  return finalString;
}


/* SUM SOLUTION */

function sum(inputArr){
  var total = 0;
  for(var i =0; i < inputArr.length; i++){
    total += inputArr[i];
  }
  return total;
}


/* GRID GENERATOR SOLUTION */

function gridGenerator(size){
  var board = "";
  // i is the lines
  for(var i = 0; i < size; i++){
    // j is the characters
    for(var j =0; j < size; j++){
      if((i+j) % 2 === 0){
        board += "#";
      } else {
        board += " ";
      }
    }
  board += "\n";
  }
  return board;
}

/* JOIN SOLUTION */


function join(inputArr, delimiter){
  var finalString = "";
  for(var i = 0; i < inputArr.length; i++){
    finalString += inputArr[i];
    if(typeof delimiter !== "undefined" && i < inputArr.length - 1){
      finalString += delimiter;
    } 
  }
  return finalString;
}





/* PARAMIFY SOLUTIONS */

function paramify(obj){
  var params = [];
  for(var prop in obj){
    if(Object.hasOwnProperty.call(obj, prop)){
      params.push(prop + "=" + obj[prop]);
    }
  }
  // used the join function created earlier
  return join(params.sort(),"&");
}


function paramifyObjectKeys(obj){
  return Object.keys(obj).map(function(key){
    return key + "=" + obj[key];
  }).sort().join("&");
}


/* RENAME FILES */

function renameFiles(arrayOfFilenames) {

  var nameTracker = {},
  namer = function(fileName, num){ return fileName + "(" + num + ")"};

  return arrayOfFilenames.map(function(name) {
    // extension name
    var extension = nameTracker[name] || 0;
    // how many times filename is used
    nameTracker[name] = extension + 1;
    // 0 return true, if not proceed...
    if(!extension){
      return name;
    }
    // while the key exists
    keyName = namer(name, extension);
    while(nameTracker[keyName]){
      keyName = namer(name, extension++);
    }
    nameTracker[keyName] = 1;
    return keyName;
  });


};

// Recursive Solution

// var renameFiles = function(arrayOfNames) {
//  var filenames = [];
//
//   function renamer(name) {
//     // if name not in list, do nothing
//     // BASE CASE
//     if (filenames.indexOf(name) == -1) {
//       filenames.push(name);
//     }
//     else {
//       // if the name has numbers, add 1 to the number
//       var parentheses = name.indexOf("(");
//       if (parentheses > -1) {
//         // take current number and add 1
//         var number = +name.match(/\d+/)[0] + 1;
//         //
//         renamer(name.substring(0,parentheses+1)+number+")")
//       }
//       // otherwise, add "(1)" to the name
//       else renamer(name+"(1)");
//     }
//   }
//
//   arrayOfNames.forEach(renamer);
//
//   return filenames;
// }







