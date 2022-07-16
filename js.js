const cells = document.querySelectorAll(".cell");
const resBtn = document.querySelector(".reset-button");
const result = document.querySelector(".result");
const resText = document.querySelector(".result-text");
const resultRes = document.querySelector(".res-btn");
const xCounter = document.querySelector("[data-x-score]");
const oCounter = document.querySelector("[data-o-score]");
const drawCounter = document.querySelector("[data-draws-score]");
const quitBtn = document.querySelector(".quit-btn");
const currentTurnDisplay = document.querySelector(".current-turn-value");
const resultSpan = document.querySelector(".result-span-mark");
const resultSpanText = document.querySelector(".result-span-text");

let winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn;
let xCount = 0;
let oCount = 0;
let drawCount = 0;

///////////////////////////
startGame();

function startGame() {
  xTurn = true;
  turnSwapDisplay("o");

  result.classList.remove("result-show");

  cells.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.addEventListener("click", clickHandler, { once: true });
  });
}

function clickHandler(e) {
  let currentTurn = xTurn ? "x" : "o";
  target = e.target;

  placeMark(currentTurn, target);
  turnSwap();
  turnSwapDisplay(currentTurn);
  gameEnd(currentTurn);
}

function placeMark(currentTurn, target) {
  target.classList.add(currentTurn);
}

function turnSwap() {
  xTurn = !xTurn;
}

function turnSwapDisplay(currentTurn) {
  currentTurnDisplay.classList.remove("mini-o");
  currentTurnDisplay.classList.remove("mini-x");

  currentTurn == "x"
    ? currentTurnDisplay.classList.add("mini-o")
    : currentTurnDisplay.classList.add("mini-x");
}

function checkWin(currentTurn) {
  return winCombos.some((combo) => {
    return combo.every((i) => {
      return cells[i].classList.contains(currentTurn);
    });
  });
}

function checkDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

function gameEnd(currentTurn) {
  resultSpan.classList.remove("result-x");
  resultSpan.classList.remove("result-o");

  if (checkWin(currentTurn)) {
    currentTurn == "x" ? xCount++ : oCount++;
    currentTurn == "x"
      ? (resText.style.color = "var(--x-color)")
      : (resText.style.color = "var(--circle-color)");
    currentTurn == "x"
      ? resultSpan.classList.add("result-x")
      : resultSpan.classList.add("result-o");

    resultSpanText.innerText = "IS WINNER!";
    result.classList.add("result-show");
  } else if (checkDraw()) {
    drawCount++;
    resText.style.color = "white";
    resultSpanText.innerText = "DRAW!!";
    result.classList.add("result-show");
  }

  displayUpdate();
}

function displayUpdate() {
  drawCounter.innerText = drawCount;
  oCounter.innerText = oCount;
  xCounter.innerText = xCount;
}

resBtn.addEventListener("click", startGame);

resultRes.addEventListener("click", startGame);

quitBtn.addEventListener("click", () => {
  drawCount = 0;
  oCount = 0;
  xCount = 0;
  startGame();
  displayUpdate();
});
