function guestListFns(guestsArray, secretCode) {
  var guestFns = [];
  for(var i = 0; i < guestsArray.length; i++) {
    guestFns.push(makeGuestFunction(guestsArray[i], secretCode))
  }
  return guestFns;
}

function makeGuestFunction(guest, secretCode) {
  return function(code) {
    if(code===secretCode) {
      return guest;
    } else {
      return "Secret-Code: Invalid";
    }
  }
}

function generateGuestList(guestFns, secretCode) {
  return guestFns.map(function(guestFn) {
    return guestFn(secretCode);
  })
}