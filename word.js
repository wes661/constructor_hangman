
var Letter = require('./letter.js');

var Word = function(word){
    this.word = word;
    this.letters = [];
    this.letterFound = false;

    this.addLetters = function() {
        for(var i = 0; i < this.word.length; i++){
          var newLetter = new Letter(this.word[i]);
          this.letters.push(newLetter);
        }
    };

    this.showWord = function() {
        var display = '';
        //render the word based on if letters are found or not
        this.letters.forEach(function(ltr){
          var currentLetter = ltr.showLetter();
          display += currentLetter;
        });
    
        console.log("\n" + display + "\n");
      };
    
}



module.exports = Word;


    

    

    