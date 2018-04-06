var inquirer = require('inquirer');
var Word = require('./word.js');
var hangman = require('./game.js');
var guessesLeft = 8;
var guessedLetters = [];

var randWord = hangman.gameWords[Math.floor(Math.random() * hangman.gameWords.length)];
var newWord = new Word(randWord);

console.log(newWord.word);
newWord.addLetters();
newWord.showWord();
guessLetter();

function guessLetter(){
    console.log("\nGuesses left: " + guessesLeft + "\n");
    inquirer.prompt({
        type: 'input',
        message: 'guess a letter',
        name: 'selected'
    }).then(function(data){
        guessedLetters.push(data.selected);
        console.log(guessedLetters.join());
      if(newWord.letters.indexOf(data.selected)){
        for(i = 0; i < newWord.letters.length; i++){
          if(newWord.letters[i].letter.toLowerCase() == data.selected.toLowerCase()){
            newWord.letters[i].show = true;
          }
        //   else{
        //       guessesLeft --;
        //       console.log("Incorrect, you have " + guessesLeft + "guesses left." );
        //     }
        }
      }
      newWord.showWord();
       
       
       guessLetter();
    })
} 