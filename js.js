const CELLS = document.querySelectorAll("[cell]");
const RES_BTN = document.querySelector("[main-reset-button]");
const RESULT = document.querySelector("[result]");
const RESULT_TEXT = document.querySelector("[result-text]");
const RESULT_RES_BTN = document.querySelector("[result-reset-btn]");
const X_COUNTER = document.querySelector("[x-score]");
const O_COUNTER = document.querySelector("[o-score]");
const DRAW_COUNTER = document.querySelector("[draws-score]");
const QUIT_BTN = document.querySelector("[quit-btn]");
const CURREN_TURN_DISPLAY = document.querySelector(".current-turn-value");
const RESULT_SPAN = document.querySelector(".result-span-mark");
const RESULT_SPAN_TEXT = document.querySelector("[result-span-text]");

let WIN_COMBOS = [
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

  RESULT.classList.remove("result-show");

  CELLS.forEach((cell) => {
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
  CURREN_TURN_DISPLAY.classList.remove("mini-o");
  CURREN_TURN_DISPLAY.classList.remove("mini-x");

  currentTurn == "x"
    ? CURREN_TURN_DISPLAY.classList.add("mini-o")
    : CURREN_TURN_DISPLAY.classList.add("mini-x");
}

function checkWin(currentTurn) {
  return WIN_COMBOS.some((combo) => {
    return combo.every((i) => {
      return CELLS[i].classList.contains(currentTurn);
    });
  });
}

function checkDraw() {
  return [...CELLS].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

function gameEnd(currentTurn) {
  RESULT_SPAN.classList.remove("result-x");
  RESULT_SPAN.classList.remove("result-o");

  if (checkWin(currentTurn)) {
    currentTurn == "x" ? xCount++ : oCount++;
    currentTurn == "x"
      ? (RESULT_TEXT.style.color = "var(--x-color)")
      : (RESULT_TEXT.style.color = "var(--circle-color)");
    currentTurn == "x"
      ? RESULT_SPAN.classList.add("result-x")
      : RESULT_SPAN.classList.add("result-o");

    RESULT_SPAN_TEXT.innerText = "IS WINNER!";
    RESULT.classList.add("result-show");
  } else if (checkDraw()) {
    drawCount++;
    RESULT_TEXT.style.color = "white";
    RESULT_SPAN_TEXT.innerText = "DRAW!!";
    RESULT.classList.add("result-show");
  }

  displayUpdate();
}

function displayUpdate() {
  DRAW_COUNTER.innerText = drawCount;
  O_COUNTER.innerText = oCount;
  X_COUNTER.innerText = xCount;
}

RES_BTN.addEventListener("click", startGame);

RESULT_RES_BTN.addEventListener("click", startGame);

QUIT_BTN.addEventListener("click", () => {
  drawCount = 0;
  oCount = 0;
  xCount = 0;
  startGame();
  displayUpdate();
});
