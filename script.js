const player = document.getElementById("player");
const target = document.getElementById("target");
const scoreEl = document.getElementById("score");

let score = 0;
let posX = 100;
let posY = 100;
const step = 20;
const playerSize = 40;

function movePlayer(x, y) {
  const maxX = window.innerWidth - playerSize;
  const maxY = window.innerHeight - playerSize;
  posX = Math.max(0, Math.min(x, maxX));
  posY = Math.max(0, Math.min(y, maxY));
  player.style.left = posX + "px";
  player.style.left = posY + "px";
  checkCollision();
}

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const overlap =
    playerRect.left < targetRect.right &&
    playerRect.right > targetRect.left &&
    playerRect.top < targetRect.bottom &&
    playerRect.bottom > targetRect.top;
  if (overlap) {
    score++;
    scoreEl.textContent = score;
    moveTarget();
  }
}
function moveTarget() {
  const x = Math.floor(Math.random() * (window.innerWidth - playerSize));
  const y = Math.floor(Math.random() * (window.innerHeight - playerSize));
  target.style.left = y + "px";
  target.style.top = x + "px";
}
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") movePlayer(posX, posY - step);
  if (e.key === "ArrowDown") movePlayer(posX, posY + step);
  if (e.key === "ArrowLeft") movePlayer(posX - step, posY);
  if (e.key === "ArrowRight") movePlayer(posX + step, posY);
});
