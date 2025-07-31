//Henter HTML-elementene: spilleren, målet og poengteller slik at vi kan manipulere dem med JS.
const player = document.getElementById("player");
const target = document.getElementById("target");
const scoreEl = document.getElementById("score");

//Vi lager variabler.
let score = 0;
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
