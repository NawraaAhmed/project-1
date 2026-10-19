/* const crew = [
  {
    name: "Luffy",
    crewImg: "./imges/luffy.png",
  },
  {
    name: "Zoro",
    crewImg: "./imges/zoro.png",
  },
  {
    name: "Sanji",
    crewImg: "./imges/sanji.png",
  },
  {
    name: "Nami",
    crewImg: "./imges/nami.png",
  },
  {
    name: "Robin",
    crewImg: "./imges/robin.png",
  },
]; */

const villainImg = "./imges/blackbeard.png";
const villainName = "Blackbeard";

const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");
const livesElement = document.querySelector("#lives");
const startButton = document.querySelector("#start-game");
const howToPlayButton = document.querySelector("#how-to-play");
const characterButtons = document.querySelectorAll(".crew");
const characterSection = document.querySelector("#select-character");
const boardElement = document.querySelector("#board");
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

let playerChoice = "";
let chosenImg = "";
let gameRunning = false;

function letsPlay(event) {
  if (gameRunning) {
    return;
  }

  //save name & img
  playerChoice = event.currentTarget.dataset.name;
  chosenImg = event.currentTarget.dataset.crewImg;

  //show selected
  characterButtons.forEach((button) => {
    button.classList.remove("selected");
  });

  event.currentTarget.classList.add("selected");
  messageElement.textContent = `You chose ${playerChoice}`;

  /* playerChoiceMessage.textContent = `You chose ${playerChoice}`;
  setTimeout(() => {
    playerChoiceMessage.textContent = ``;
    screenElement.forEach((el) => {
      console.log(el);
      el.classList.remove("hidden");
    });
  }, 2000);

  console.log(playerChoice); */
}

characterButtons.forEach((button) => {
  button.addEventListener("click", letsPlay);
});

const gameTime = 30;

function startGame() {
  if (playerChoice === "") {
    messageElement.textContent = "Please choose your character first";
    return;
  }

  score = 0;
  lives = 3;
  timeLeft = gameTime;
  gameRunning = true;

  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;
  livesElement.textContent = "❤️❤️❤️";

  messageElement.textContent = "Click your pirate, but avoid Blackbeard";

  // startButton = true;
  characterSection.classList.toggle("hidden");
  gameOverElement.classList.toggle("hidden");
  boardElement.classList.remove("hidden");

  //timer count down
  timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      console.log("You Lose");
    }
  }, 1000);
}

function showPirates() {
  if (!gameRunning) {
    return;
  }
}

function showHelp() {
  HelpElement.classList.remove("hidden");
}

function closeHelp() {
  closeHelpButton.classList.toggle("hidden");
}

function playAgain() {
  startGame();
}

startButton.addEventListener("click", startGame);

howToPlayButton.addEventListener("click", showHelp);
closeHelpButton.addEventListener("click", closeHelp);

playAgainButton.addEventListener("click", playAgain);

boardElement.classList.add("hidden");
