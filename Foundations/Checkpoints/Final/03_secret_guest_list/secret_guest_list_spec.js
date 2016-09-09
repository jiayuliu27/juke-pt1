describe("secret-guest-list", function(){
  describe('guestListFns', function() {
    var guestNameFunctions,
        guestsArray,
        secretCode;
    
    beforeEach(function(){
      guestsArray = ["James", "Casey", "Karen", "Gene", "Michele", "Ashi"],
      secretCode = 404;

      guestNameFunctions = guestListFns(guestsArray, secretCode);  

    });
      
    it('guestListFns returns an array of functions', function() {
      expect(Array.isArray(guestNameFunctions)).toEqual(true);    
    });

    it('the resulting array is the same length as the given number', function() {
       expect(guestNameFunctions.length).toEqual(6);
    });

    it('all indexes in the array are functions', function(){ 
      // everything must be a function (hence the .every function)
      var onlyFuncs = guestNameFunctions.every(function(fn){
        if(typeof fn === 'function'){
          return true;
        } 
      });
      expect(onlyFuncs).toEqual(true);
    });

    it("functions in the `guestNameFunctions` returns guest from the guestArray", function(){
      var guest = guestNameFunctions[0](secretCode);

      expect(guest).toEqual("James");
    });

    it("returns the string `secret code: invalid` if the wrong code is passed to a guestArray function", function() {
      var guest = guestNameFunctions[1](8910);

      expect(guest).toEqual("Secret-Code: Invalid");
    });

    it("functions in the `guestNameFunction` do not have additional property or methods attached(use closure)", function(){
      var guestFunction = guestNameFunctions[2];

      expect(Object.keys(guestFunction).length).toEqual(0);
    });
    
    it('guestListFns does not call Array.prototype methods', function(){
      spyOn(Array.prototype, 'forEach').and.callThrough();
      spyOn(Array.prototype, 'map').and.callThrough();

      guestListFns(guestsArray, secretCode);

      expect(Array.prototype.forEach.calls.any()).toEqual(false);
      expect(Array.prototype.map.calls.any()).toEqual(false);

    });

  });

  describe("generateGuestList", function() {
    var guestNameFunctions,
        guestsArray,
        secretCode;
    
    beforeEach(function(){
      guestsArray = ["James", "Casey", "Karen", "Gene", "Michele", "Ashi"],
      secretCode = 404;

      guestNameFunctions = guestListFns(guestsArray, secretCode);  
    });


    it("`generateGuestList` is a function object", function(){
      expect(typeof generateGuestList === "function").toEqual(true);
    });

    it("returns an array of strings", function(){
      var officialGuestList = generateGuestList(guestNameFunctions, secretCode);

      var isString = officialGuestList.every(function(name){
        return typeof name === "string";
      });
      
      expect(Array.isArray(officialGuestList)).toEqual(true);
      expect(isString).toEqual(true);
    
    });

    it("contains the original names from the guest list", function(){
      var officialGuestList = generateGuestList(guestNameFunctions, secretCode);

      expect(officialGuestList).toEqual(["James", "Casey", "Karen", "Gene", "Michele", "Ashi"]);

    });


  });

})

