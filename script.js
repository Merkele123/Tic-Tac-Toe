const X_class = "x";
const Circle_class = "circle";
const Winning_combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 3],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const WinningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restart");
const WinningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;
StartGame();

restartButton.addEventListener("click", StartGame);

function StartGame() {
  circleTurn = true;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_class);
    cell.classList.remove(Circle_class);
    cell.removeEventListener('click', handleClick)
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  WinningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const current_class = circleTurn ? Circle_class : X_class;
  placeMark(cell, current_class);
  if (checkWin(current_class)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
  //Check for win
  //Check for draw
  //Switch turns
}

function endGame(draw) {
  if (draw) {
    WinningMessageText.innerText = "Draw!";
  } else {
    WinningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  WinningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_class) || cell.classList.contains(Circle_class)
    );
  });
}

function placeMark(cell, current_class) {
  cell.classList.add(current_class);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_class);
  board.classList.remove(Circle_class);
  if (circleTurn) {
    board.classList.add(Circle_class);
  } else {
    board.classList.add(X_class);
  }
}

function checkWin(current_class) {
  return Winning_combination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(current_class);
    });
  });
}
