var inquirer = require('inquirer');
var Word = require('./word.js');
var hangman = require('./game.js');
var guessesLeft = 6;
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
    console.log("\nGuesses left: " + guessesLeft + " Wins: " + wins + " Losses: " + losses + "\nGuessed Letters: " + guessedLetters + "\n");
    
    inquirer.prompt({
        type: 'input',
        message: 'guess a letter',
        name: 'selected'
    }).then(function(data){
      newWord.gameLetters = newWord.gameLetters.filter(emptyElement);
      newWord.gameLetters.sort();

      if(guessedLetters.indexOf(data.selected) > -1){
        console.log("You guessed that letter already!");
        newWord.showWord();
        playGame();
      }
      else if(newWord.gameLetters.indexOf(data.selected) == -1){
        console.log("Incorrect, guess again!");
        guessesLeft--;
        if(guessesLeft == 0){
          console.log("You lose!")
          playAgain();
        }else
        guessedLetters.push(data.selected);
        newWord.showWord();
        playGame();
        
      } 
      else if(newWord.gameLetters.indexOf(data.selected) >= 0 ){
        for(i = 0; i < newWord.letters.length; i++){
          if(newWord.letters[i].letter.toLowerCase() == data.selected){
            newWord.letters[i].show = true;
            correctLetters.push(data.selected.toLowerCase());
            correctLetters.sort();
            guessedLetters.push(data.selected);
          }
        }
        newWord.showWord();
        playGame();
      }
      if(correctLetters.toString() == newWord.gameLetters.toString()){
        wins++;
        console.log("\nYou Win!")
        getNewWord();
        guessesLeft = 6;
        correctLetters = [];
        guessedLetters = [];
        newWord.showWord();
        playGame();
      } 
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
  newWord.addLetters();
}
function playAgain(){
  inquirer.prompt({
    type: "confirm",
    message: "Would you like to play again?",
    name: "answer"
  }).then(function(data){
    if(data.answer === true ){
      guessesLeft = 6;
      correctLetters = [];
      guessedLetters = [];
      getNewWord();
      newWord.showWord();
      playGame();
    }else{
      console.log("Thanks for playing!");
    }
  })
}  