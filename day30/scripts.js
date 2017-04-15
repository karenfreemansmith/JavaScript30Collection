const scoreboard = document.querySelector('.score');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const starter = document.querySelector('#startGame');
let timeUp = false;
let lastHole;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max-min) + min);
}

function randomHole(holes) {
  const idx = Math.round(Math.random() * (holes.length-1));
  const hole = holes[idx];
  if(hole===lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200,1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(()=> {
    hole.classList.remove('up');
    if(!timeUp) peep();
  }, time);
}

function startGame() {
  scoreboard.textContent = 0;
  timeUp = false;
  peep();
  setTimeout(()=> timeUp = true, 10000);
}

function bonk(e) {
  if(!e.isTrusted) return; //to prevent cheating
  // apparently you can also click on the invisible mole,
  // or click more than once while it's "up"
  // if classList.contains('up') did not help...
  score++;
  this.classList.remove('up');
  scoreboard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
starter.addEventListener('click', startGame);
