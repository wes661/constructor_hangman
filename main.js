var inquirer = require('inquirer');
var Word = require('./word.js');
var hangman = require('./game.js');
var guessesLeft = 8;
var correctLetters = [];
var checkLetter = [];
var wins = 0;
var losses = 0;
var spaceArray = [];

var randWord = hangman.gameWords[Math.floor(Math.random() * hangman.gameWords.length)];
var newWord = new Word(randWord);

console.log(newWord.word);
newWord.addLetters();
newWord.showWord();
playGame();

function playGame(){
    console.log("\nGuesses left: " + guessesLeft + " Wins: " + wins + " Losses: " + losses);
    inquirer.prompt({
        type: 'input',
        message: 'guess a letter',
        name: 'selected'
    }).then(function(data){
      newWord.testLetters = newWord.testLetters.filter(emptyElement);
      newWord.testLetters.sort();
      console.log(newWord.testLetters);
        // console.log("Guessed: " + guessedLetters.join());
      if(newWord.letters.indexOf(data.selected)){
        for(i = 0; i < newWord.letters.length; i++){
          if(newWord.letters[i].letter.toUpperCase() == data.selected.toUpperCase()){
            newWord.letters[i].show = true;
            correctLetters.push(data.selected);
            correctLetters.sort();
            console.log(correctLetters);
          }
        }
        
        if(correctLetters.toString() == newWord.testLetters.toString()){
          wins++;
          console.log("You Win!")
        }
      }
      
      newWord.showWord();
       
       
       playGame();
    })
} 

function emptyElement(element){
  if(element == ' '){
    return false;
  }else{
    return true;
  }
}