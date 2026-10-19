/* const crew = [
  {
    name: "Luffy",
    crewImg: "./imges/luffy-img.jpeg",
  },
  {
    name: "Zoro",
    crewImg: "./imges/zoro.png",
  },
  {
    name: "Sanji",
    crewImg: "./imges/sanji-img.jpeg",
  },
  {
    name: "Nami",
    crewImg: "./imges/nami-img.jpeg",
  },
  {
    name: "Robin",
    crewImg: "./imges/robin-img.jpeg",
  },
]; */

const villainImg = "./imges/blackbeard-img.jpeg";
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
const gameOverElement = document.querySelector("#game-over");
const finalScoreElement = document.querySelector("#final-score");
const playAgainButton = document.querySelector("#play-again");

// console.log(scoreElement);
// console.log(timeElement);
// console.log(livesElement);
// console.log(startButton);
// console.log(howToPlayButton);
//console.log(characterButtons);
// console.log(selectCharacterElement);
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
  messageElement.textContent = `You chose ${playerChoice}!`;

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
  gameOverElement.classList.add("hidden");
  characterSection.classList.add("hidden");
  boardElement.classList.remove("hidden");

  messageElement.textContent = "Click your pirate, but avoid Blackbeard";

  startButton = true;

  //timer count down
  timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;
  }, 1000);
}

startButton.addEventListener("click", startGame);

boardElement.classList.add("hidden");
