"use strict";

const card = document.querySelector(`.main-container`);
const mode = document.querySelector(`.mode`);
const ball = document.querySelector(`.ball`);
const wheel = document.querySelector(`.wheel`);
const btnSpin = document.querySelector(`.btn-spin`);
const btnHold = document.querySelector(`.btn-hold`);
const btnNewGame = document.querySelector(`.btn-newGame`);

const p1 = {
  total: 0,
  hold: 0,
  scoreDisp: document.querySelector(`.p1score`),
  holdDisp: document.querySelector(`.p1count`),
  body: document.querySelector(`.card1`),
};

const p2 = {
  total: 0,
  hold: 0,
  scoreDisp: document.querySelector(`.p2score`),
  holdDisp: document.querySelector(`.p2count`),
  body: document.querySelector(`.card2`),
};

const options = {
  1: 0,
  2: 300,
  3: 240,
  4: 180,
  5: 120,
  6: 60,
};

let deg = 0;
let prev = 0;
let randNum = 0;
let currPlayer = p1;

if (localStorage.mode == `black`) {
  ball.style.transform = `translateX(13px)`;
  document.body.style.backgroundColor = `#292c35`;
} else {
  ball.style.transform = `translateX(-12px)`;
  document.body.style.backgroundColor = `#d8d5d5`;
}

const switchPlayer = function () {
  currPlayer.hold = 0;
  currPlayer.scoreDisp.innerText = `${currPlayer.total}`;
  currPlayer.holdDisp.innerText = `${currPlayer.hold}`;
  currPlayer.body.style.opacity = `0.5`;
  if (currPlayer == p1) currPlayer = p2;
  else currPlayer = p1;
  currPlayer.body.style.opacity = `1.0`;
};

const gameOver = function () {
  currPlayer.hold = 0;
  currPlayer.scoreDisp.innerText = `${currPlayer.total}`;
  currPlayer.holdDisp.innerText = `${currPlayer.hold}`;
  btnSpin.disabled = true;
  btnHold.disabled = true;
  currPlayer.body.style.backgroundColor = `gold`;
};

btnSpin.addEventListener(`click`, function () {
  randNum = Math.floor(Math.random() * 6) + 1;
  console.log(randNum);
  deg += 1800 + (options[randNum] - prev);
  wheel.style.transform = `rotate(${deg}deg)`;
  prev = options[randNum];
  btnSpin.disabled = true;
  btnHold.disabled = true;
  setTimeout(() => {
    if (randNum == 1) switchPlayer();
    else {
      currPlayer.hold += randNum;
      currPlayer.holdDisp.innerText = `${currPlayer.hold}`;
    }
    btnSpin.disabled = false;
    btnHold.disabled = false;
  }, 1000);
});

btnHold.addEventListener(`click`, function () {
  currPlayer.total += currPlayer.hold;
  if (currPlayer.total >= 100) gameOver();
  else switchPlayer();
});

btnNewGame.addEventListener(`click`, function () {
  card.classList.toggle(`shake-left-right`);
  deg = 0;
  prev = 0;
  randNum = 0;
  currPlayer.total = 0;
  switchPlayer();
  currPlayer.total = 0;
  switchPlayer();
  currPlayer = p1;
  btnSpin.disabled = false;
  btnHold.disabled = false;
  p1.body.style.opacity = `1.0`;
  p2.body.style.opacity = `0.5`;
  wheel.style.transform = `rotate(0deg)`;
  p1.body.style.backgroundColor = `lightgreen`;
  p2.body.style.backgroundColor = `lightgreen`;
  setTimeout(function () {
    card.classList.toggle(`shake-left-right`);
  }, 1000);
});

mode.addEventListener(`click`, function () {
  if (localStorage.mode == `black`) {
    ball.style.transform = `translateX(-12px)`;
    document.body.style.backgroundColor = `#d8d5d5`;
    localStorage.mode = `white`;
  } else {
    ball.style.transform = `translateX(13px)`;
    document.body.style.backgroundColor = `#292c35`;
    localStorage.mode = `black`;
  }
});
