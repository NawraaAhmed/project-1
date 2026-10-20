const villainImg = "./imges/blackbeard.png";
const villainName = "Blackbeard";

const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");
const livesElement = document.querySelector("#lives");
const startButton = document.querySelector("#start-game");
const howToPlayButton = document.querySelector("#how-to-play");
const characterButtons = document.querySelectorAll(".crew");
const characterSection = document.querySelector("#select-character");
const boardElement = document.querySelector(".board");
const holes = document.querySelectorAll(".hole");
const messageElement = document.querySelector("#message");
const HelpElement = document.querySelector("#show-help");
const closeHelpButton = document.querySelector("#close");
const gameOverElement = document.querySelector("#game-over");
const finalScoreElement = document.querySelector("#final-score");
const playAgainButton = document.querySelector("#play-again");

//console.log(scoreElement);
//console.log(timeElement);
//console.log(livesElement);
//console.log(startButton);
//console.log(howToPlayButton);
//console.log(characterButtons);
//console.log(selectCharacterElement);
//console.log(boardElement);
//console.log(holes);
//console.log(messageElement);
//console.log(gameOverElement);
//console.log(finalScoreElement);
//console.log(playAgainButton);

const gameTime = 30;

let playerChoice = "";
let chosenImg = "";
let gameRunning = false;
let timer;
let timeLeft = gameTime;
let score = 0;
let lives = 3;

function letsPlay(event) {
  if (gameRunning) {
    return;
  }

  //save name & img
  playerChoice = event.currentTarget.dataset.name;
  chosenImg = event.currentTarget.dataset.img;

  //show selected
  characterButtons.forEach((button) => {
    button.classList.remove("selected");
  });

  event.currentTarget.classList.add("selected");
  messageElement.textContent = `You chose ${playerChoice}`;
}

characterButtons.forEach((button) => {
  button.addEventListener("click", letsPlay);
});

//const gameTime = 30;
let popUpTimer;

function startGame() {
  if (playerChoice === "") {
    messageElement.textContent = "Please choose your character first";
    return;
  }

  score = 0;
  lives = 3;
  timeLeft = gameTime;
  gameRunning = true;

  //reset
  clearInterval(timer);
  clearInterval(popUpTimer);

  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;
  livesElement.textContent = "❤️❤️❤️";

  messageElement.textContent = "Click your pirate, but avoid Blackbeard";

  HelpElement.classList.toggle("hidden");
  characterSection.classList.toggle("hidden");
  gameOverElement.classList.toggle("hidden");
  boardElement.classList.remove("hidden");

  showPirates();

  //timer count down
  timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      //clearInterval(timer);
      //console.log("You Lose");
      endGame();
    }
  }, 1000);

  popUpTimer = setInterval(showPirates, 1300);
}

function showPirates() {
  if (!gameRunning) {
    return;
  }

  //clear character
  holes.forEach((hole) => {
    hole.innerHTML = "";
  });

  const playerPosition = Math.floor(Math.random() * holes.length);
  let villainPosition = Math.floor(Math.random() * holes.length);

  while (villainPosition === playerPosition) {
    villainPosition = Math.floor(Math.random() * holes.length);
  }
}

function addPirate(event) {
  if (!gameRunning) {
    return;
  }

  if (event.currentTarget.classList.contains("player")) {
    score++;
    scoreElement.textContent = score;
  } else {
    lives--;
    if (lives === 2) {
      livesElement.textContent = "❤️❤️💔";
    } else if (lives === 1) {
      livesElement.textContent = "❤️💔💔";
    } else {
      livesElement.textContent = "💔💔💔";
      endGame();
    }
  }
}

function endGame() {
  gameRunning = false;

  //reset
  clearInterval(timer);
  clearInterval(popUpTimer);

  //clear charaters
  holes.forEach((hole) => {
    hole.innerHTML = "";
  });

  finalScoreElement.textContent = score;
  gameOverElement.classList.remove("hidden");
  characterSection.classList.remove("hidden");
}

function showHelp() {
  HelpElement.classList.remove("hidden");
}

function closeHelp() {
  closeHelpButton.classList.add("hidden");
}

function playAgain() {
  startGame();
}

startButton.addEventListener("click", startGame);

howToPlayButton.addEventListener("click", showHelp);
closeHelpButton.addEventListener("click", closeHelp);

playAgainButton.addEventListener("click", playAgain);

boardElement.classList.add("hidden");
