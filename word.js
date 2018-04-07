
var Letter = require('./letter.js');

var Word = function(word){
    this.word = word;
    this.letters = [];
    this.gameLetters = [];
    this.letterFound = false;

    this.addLetters = function() {
        for(var i = 0; i < this.word.length; i++){
          var newLetter = new Letter(this.word[i]);
          this.letters.push(newLetter);
          this.gameLetters.push(newLetter.letter.toLowerCase());
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

      this.guessWord = function(){
        for(i = 0; i < newWord.letters.length; i++){
          if(newWord.letters[i].letter.toLowerCase() == data.selected.toLowerCase()){
            newWord.letters[i].show = true;
            correctLetters.push(data.selected);
            correctLetters.sort();
            console.log(correctLetters);
          }
        }
      }
      
}



module.exports = Word;


    

    

    