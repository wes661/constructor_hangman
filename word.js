var inquirer = require('inquirer');
var Letter = require('./letter.js');
var hangman = require('./game.js');

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
    
        console.log(display);
      };
    
}

var randWord = hangman.gameWords[Math.floor(Math.random() * hangman.gameWords.length)];
var newWord = new Word(randWord);


// console.log(newWord.word);
// console.log(newWord.letters);

newWord.addLetters();
newWord.showWord();
// guessLetter();

// function guessLetter(){
//     inquirer.prompt({
//         type: 'input',
//         message: 'guess a letter',
//         name: 'selected'
//     }).then(function(data){
//        console.log(newWord.word);
//        console.log(newWord.letters);
//        //guessLetter();
//     })
// } 

    

    

    