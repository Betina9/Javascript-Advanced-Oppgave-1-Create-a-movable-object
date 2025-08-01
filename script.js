// Vi henter elementer fra HTML
const player = document.getElementById("player");
const target = document.getElementById("target");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highscore");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");

// Spillets tilstand (state)
let score = 0;
let highScore = 0;
let posX = 100;
let posY = 100;
const step = 20;
const playerSize = 40;

// Timer
let startTime = 0;
let timerInterval = null;

// Flytter spiller og sjekker kollisjon
function movePlayer(x, y) {
  //Regn ut maks tillatt posisjon slik at spilleren holder seg på skjermen
  const maxX = window.innerWidth - playerSize;
  const maxY = window.innerHeight - playerSize;
  posX = Math.max(0, Math.min(x, maxX));
  posY = Math.max(0, Math.min(y, maxY));
  //Oppdater CSS-posisjon (faktisk flytting på skjermen)
  player.style.left = posX + "px";
  player.style.top = posY + "px";
  //Etter flytting: sjekk om vi traff målet
  checkCollision();
}

// Kollisjon - Sjekker om spilleren overlapper målet
function checkCollision() {
  const p = player.getBoundingClientRect();
  const t = target.getBoundingClientRect();
  const overlap =
    p.left < t.right &&
    p.right > t.left &&
    p.top < t.bottom &&
    p.bottom > t.top;
  //Ved treff: øk poeng, oppdater visning og flytt målet
  if (overlap) {
    score++;
    updateScore();
    moveTarget();
  }
}

// Flytter målet til en tilfeldig posisjon på skjermen
function moveTarget() {
  const x = Math.floor(Math.random() * (window.innerWidth - playerSize));
  const y = Math.floor(Math.random() * (window.innerHeight - playerSize));
  target.style.left = x + "px";
  target.style.top = y + "px";
}
//Piltaster flytter spilleren i faste steg
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") movePlayer(posX, posY - step);
  if (e.key === "ArrowDown") movePlayer(posX, posY + step);
  if (e.key === "ArrowLeft") movePlayer(posX - step, posY);
  if (e.key === "ArrowRight") movePlayer(posX + step, posY);
});
//klikk flytter spilleren dit du klikker
document.addEventListener("click", (e) => {
  if (e.target.closest("#hud")) return;
  movePlayer(e.clientX - playerSize / 2, e.clientY - playerSize / 2);
});

// Timer - Oppdaterer tekst til "Tid: X sek" basert på startTime
function updateTimer() {
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  timerEl.textContent = `⏱️ Tid: ${seconds} sek`;
}
//Starter timeren på nytt fra 0
function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  startTime = Date.now();
  timerEl.textContent = `⏱️ Tid: 0 sek`;
  timerInterval = setInterval(updateTimer, 1000);
}

// Score - Oppdaterer poengvisningen og high score
function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
  if (score > highScore) {
    highScore = score;
    highScoreEl.textContent = `🏆 High Score: ${highScore}`;
  }
}

// Restart - Nullstill alt som hører til en ny runde
function restartGame() {
  score = 0;
  updateScore();
  posX = 100;
  posY = 100;
  movePlayer(posX, posY);
  moveTarget();
  startTimer();
}
//Koble restart-knapp til restart-funksjonen
restartBtn.addEventListener("click", restartGame);

//Ved oppstart: sett starttilstand
movePlayer(posX, posY);
moveTarget();
startTimer();
