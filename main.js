var inquirer = require('inquirer');
var Word = require('./word.js');
var hangman = require('./game.js');
var guessesLeft = 8;
var correctLetters = [];
var guessedLetters = [];
var wins = 0;
var losses = 0;
var randWord = hangman.gameWords[Math.floor(Math.random() * hangman.gameWords.length)];
var newWord = new Word(randWord);

getNewWord();
newWord.showWord();
playGame();



function playGame(){
    console.log("\nGuesses left: " + guessesLeft + " Wins: " + wins + " Losses: " + losses);
    inquirer.prompt({
        type: 'input',
        message: 'guess a letter',
        name: 'selected'
    }).then(function(data){
      newWord.gameLetters = newWord.gameLetters.filter(emptyElement);
      newWord.gameLetters.sort();
      console.log(newWord.gameLetters);
        // console.log("Guessed: " + guessedLetters);
      if(newWord.letters.indexOf(data.selected)){
        for(i = 0; i < newWord.letters.length; i++){
          if(newWord.letters[i].letter.toLowerCase() == data.selected.toLowerCase()){
            newWord.letters[i].show = true;
            correctLetters.push(data.selected);
            correctLetters.sort();
            console.log(correctLetters);
          }
        }
        if(correctLetters.toString() == newWord.gameLetters.toString()){
          wins++;
          console.log("\nYou Win!")
          getNewWord();
          correctLetters = [];
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

function getNewWord(){
  randWord = hangman.gameWords[Math.floor(Math.random() * hangman.gameWords.length)];
  newWord = new Word(randWord);
  console.log(newWord.word);
  newWord.addLetters();
}