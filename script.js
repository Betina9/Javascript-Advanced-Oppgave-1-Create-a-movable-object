//Henter HTML-elementene: spilleren, målet og poengteller slik at vi kan manipulere dem med JS.
const player = document.getElementById("player");
const target = document.getElementById("target");
const scoreEl = document.getElementById("score");

//Vi lager variabler.
let score = 0;
let highScore = 0;
const highScoreEl = document.getElementById("highscore");
let posX = 100;
let posY = 100;
const step = 20;
const playerSize = 40;

//Starter en funksjon som flytter spilleren til (x, y).
function movePlayer(x, y) {
  //Regner ut grensen for hvor langt spilleren kan bevege seg før den går ut av skjermen.
  const maxX = window.innerWidth - playerSize;
  const maxY = window.innerHeight - playerSize;
  //Holder spilleren innenfor skjermen. Så ikke spilleren går for langt opp/ned eller venstre/ høyre.
  posX = Math.max(0, Math.min(x, maxX));
  posY = Math.max(0, Math.min(y, maxY));
  //Flytter spilleren på skjermen ved å oppdatere left og top.
  player.style.left = posX + "px";
  player.style.top = posY + "px";
  //Etter at spilleren er flyttet, sjekker vi om den kolliderer med målet.
  checkCollision();
}

//Starter en funksjon som sjekker om spiller og mål kolliderer.
function checkCollision() {
  // Henter posisjon og størrelse på spiller og mål (som x, y, width, height).
  const playerRect = player.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  //Sjekker om rektanglene overlapper → da har spilleren “truffet” målet.
  const overlap =
    playerRect.left < targetRect.right &&
    playerRect.right > targetRect.left &&
    playerRect.top < targetRect.bottom &&
    playerRect.bottom > targetRect.top;
  //Hvis det er treff:Øk poengsummen,Flytt målet til ny tilfeldig plass.
  if (overlap) {
    score++;
    if (score > highScore) {
      highScore = score;
      highScoreEl.textContent = "🏆 High Score: " + highScore;
    }
    scoreEl.textContent = score;
    moveTarget();
  }
}
//Flytter målet til en tilfeldig plass på skjermen.
function moveTarget() {
  const x = Math.floor(Math.random() * (window.innerWidth - playerSize));
  const y = Math.floor(Math.random() * (window.innerHeight - playerSize));
  target.style.left = x + "px";
  target.style.top = y + "px";
}

//Brukeren kan styre spilleren med piltastene.
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") movePlayer(posX, posY - step);
  if (e.key === "ArrowDown") movePlayer(posX, posY + step);
  if (e.key === "ArrowLeft") movePlayer(posX - step, posY);
  if (e.key === "ArrowRight") movePlayer(posX + step, posY);
});

//Hvis brukeren klikker et sted, flytter spilleren dit med én gang.
document.addEventListener("click", (e) => {
  movePlayer(e.clientX, e.clientY);
});

let time = 0;
const timerEl = document.getElementById("timer");

// Start timer
setInterval(() => {
  time++;
  timerEl.textContent = `⏱️ Tid: ${time} sek`;
}, 1000);

const restartBtn = document.getElementById("restart-btn");

function restartGame() {
  // Nullstill posisjon
  posX = 100;
  posY = 100;
  movePlayer(posX, posY);

  // Nullstill score og timer
  score = 0;
  scoreEl.textContent = score;
  startTime = Date.now();
  updateTimer();

  // Flytt målet til ny plass
  moveTarget();
}

restartBtn.addEventListener("click", restartGame);

let score = 0;
let highScore = 0;
let startTime = Date.now();
let timerInterval;

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highscore");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");

// Timer
function updateTimer() {
  const now = Date.now();
  const seconds = Math.floor((now - startTime) / 1000);
  timerEl.textContent = `⏱ ${seconds}s`;
}

// Start timer
function startTimer() {
  clearInterval(timerInterval); // stop any running timer
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

// Kjør dette én gang ved oppstart
startTimer();

// Oppdater score
function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
  if (score > highScore) {
    highScore = score;
    highScoreEl.textContent = `🏆 High Score: ${highScore}`;
  }
}

// Når mål treffes:
function increaseScore() {
  score++;
  updateScore();
}

// Restart-funksjon
function restartGame() {
  score = 0;
  updateScore();
  startTimer();

  posX = 100;
  posY = 100;
  movePlayer(posX, posY);
  moveTarget();
}

restartBtn.addEventListener("click", restartGame);
