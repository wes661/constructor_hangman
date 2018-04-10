//Global variables/requirements
var inquirer = require('inquirer');
var Word = require('./word.js');
var hangman = require('./game.js');
var colors = require('colors');
var guessesLeft = 6;
var correctLetters = [];
var guessedLetters = [];
var wins = 0;
var losses = 0;
var randWord = hangman.gameWords[Math.floor(Math.random() * hangman.gameWords.length)];
var newWord = new Word(randWord);

//Functions to get a word and display blanks then start playing
getNewWord();
newWord.showWord();
playGame();

//Main game function that holds the logic to play
function playGame(){
    console.log("\nGuesses left: ".blue + guessesLeft + " Wins: ".green + wins + " Losses: ".red + losses + "\nGuessed Letters: ".yellow + guessedLetters + "\n");
    
    inquirer.prompt({
        type: 'input',
        message: 'GUESS A LETTER:'.blue,
        name: 'selected'
    }).then(function(data){
      newWord.gameLetters = newWord.gameLetters.filter(emptyElement);
      newWord.gameLetters.sort();

      if(guessedLetters.indexOf(data.selected) > -1){
        console.log("\nYou guessed that letter already!\n".yellow);
        newWord.showWord();
        playGame();
      }
      else if(newWord.gameLetters.indexOf(data.selected) == -1){
        console.log("\nINCORRECT!!\n".red);
        guessesLeft--;
        if(guessesLeft == 0){
          losses++;
          console.log("\nYOU LOSE!\n".red + "You couldn't guess " +(colors.red(newWord.word)) + "!\n");
          playAgain();
        }else{
        guessedLetters.push(data.selected);
        newWord.showWord();
        playGame();
        }
      } 
      else if(newWord.gameLetters.indexOf(data.selected) >= 0 ){
        console.log("\nCORRECT!\n".green)
        guessedLetters.push(data.selected);
        for(i = 0; i < newWord.letters.length; i++){
          if(newWord.letters[i].letter.toLowerCase() == data.selected){
            newWord.letters[i].show = true;
            correctLetters.push(data.selected.toLowerCase());
            correctLetters.sort();
          }
        }
        checkWin();
      }
    })
} 
//Function to remove blank spaces in array
function emptyElement(element){
  if(element == ' '){
    return false;
  }else{
    return true;
  }
}
//Function to check if user wins by comparing two arrays converted to strings
function checkWin(){
  if(correctLetters.toString() === newWord.gameLetters.toString()){
    wins++;
    console.log("\nYOU WIN!\n".green + "You guessed "  + (colors.green(newWord.word)) + "!\n");
    for(var i = hangman.gameWords.length -1; i--;){
      if (hangman.gameWords[i] === randWord) hangman.gameWords.splice(i, 1);
    }
    console.log(hangman.gameWords);
    playAgain();
  }
  else{
    newWord.showWord();
    playGame();
  } 
} 
//Function to get random word through game.js and Word constructor through word.js 
function getNewWord(){
  randWord = hangman.gameWords[Math.floor(Math.random() * hangman.gameWords.length)];
  newWord = new Word(randWord);
  newWord.addLetters();
}
//Function that prompts user if they want to play again. Resets on "Yes" Exits on "No"
function playAgain(){
  inquirer.prompt({
    type: "list",
    message: "\nWould you like to play again?\n".yellow,
    name: "answer",
    choices: ["YES", "NO"]
  }).then(function(data){
    if(data.answer === "YES" ){
      console.log("\n\n");
      guessesLeft = 6;
      correctLetters = [];
      guessedLetters = [];
      getNewWord();
      newWord.showWord();
      playGame();
    }else{
      console.log("\nThanks for playing!\n".america);
    }
  })
}  