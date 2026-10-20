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
const winLoseMessageElement = document.querySelector("#winLoseMesssage");
const finalScoreElement = document.querySelector("#final-score");
const playAgainButton = document.querySelector("#play-again");
const winLoseHeadingElement = document.querySelector("#winLoseHeading");
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
// console.log(winLoseMessageElement);

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

let popUpTimer;

function startGame() {
  if (playerChoice === "") {
    messageElement.textContent = "Please choose your character first";
    return;
  }

  //reset
  clearInterval(timer);
  clearInterval(popUpTimer);

  score = 0;
  lives = 3;
  timeLeft = gameTime;
  gameRunning = true;

  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;
  livesElement.textContent = "❤️❤️❤️";

  messageElement.textContent = "Click your pirate, but avoid Blackbeard";

  HelpElement.classList.add("hidden");
  characterSection.classList.add("hidden");
  gameOverElement.classList.add("hidden");
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

  //change very 1.3 sec
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

  //random holes
  const playerPosition = Math.floor(Math.random() * holes.length);
  let villainPosition = Math.floor(Math.random() * holes.length);

  while (villainPosition === playerPosition) {
    villainPosition = Math.floor(Math.random() * holes.length);
  }

  //player character
  holes[playerPosition].innerHTML = `
    <button class="pirate player">
      <img src="${chosenImg}" alt="${playerChoice}">
    </button>
  `;

  //blackbeard
  holes[villainPosition].innerHTML = `
    <button class="pirate villain">
      <img src="${villainImg}" alt="Blackbeard">
    </button>
  `;

  const pirates = document.querySelectorAll(".pirate");

  pirates.forEach((pirate) => {
    pirate.addEventListener("click", addPirate);
  });
}

function addPirate(event) {
  if (!gameRunning) {
    return;
  }

  //if player click on character
  if (event.currentTarget.classList.contains("player")) {
    score++;
    scoreElement.textContent = score;
  } else {
    //click backbeard
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
  //remove clicked character
  event.currentTarget.innerHTML = "";
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

  if (score >= 10) {
    winLoseHeadingElement.textContent = "You Win! 🎉🎉";
    winLoseMessageElement.textContent = "You Did Well";
  } else if (score <= 9) {
    winLoseHeadingElement.textContent = "Game Over!";
    winLoseMessageElement.textContent = "You Need to Whack More 😉";
  } else if (lives === 0) {
    winLoseHeadingElement.textContent = "Game Over!";
    winLoseMessageElement.textContent = "You Lose 😞";
  }

  finalScoreElement.textContent = score;
  gameOverElement.classList.remove("hidden");
  characterSection.classList.remove("hidden");
}

function showHelp() {
  HelpElement.classList.remove("hidden");
}

function closeHelp() {
  HelpElement.classList.add("hidden");
}

function playAgain() {
  startGame();
}

startButton.addEventListener("click", startGame);

howToPlayButton.addEventListener("click", showHelp);
closeHelpButton.addEventListener("click", closeHelp);

playAgainButton.addEventListener("click", playAgain);

boardElement.classList.add("hidden");
