 function translate(wordString){
   var vowel = "aeiou",
       index = 0,
       pigWordArray = [];

   wordString.split(" ").forEach(function(word){
     for(var i = 0; i < word.length; i++){
       if(vowel.search(word[i]) !== -1){ // is the character word[i] a vowel?
         if(word[i] !== "u" || (word[i] === "u" && word[i-1] !== "q")){
           index = i;
           break;
         }
       }
     }
     pigWordArray.push(word.slice(index, word.length) + word.slice(0, index) + 'ay');
    });

    return pigWordArray.join(" ");
}