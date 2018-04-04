var Letter = require('./letter.js')

var Word = function(word){
    this.word = word;
    this.letters = [];
    // this.letterFound = false;

    this.addLetters = function() {
        for(var i = 0; i < this.word.length; i++){
          var newLetter = new Letter(this.word[i]);
          this.letters.push(newLetter);
        }
    };
    
}

var newWord = new Word('Claymore');
newWord.addLetters("l");

console.log(newWord.word);
console.log(newWord.letters);
