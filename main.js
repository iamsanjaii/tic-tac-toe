var game = document.getElementById("gameboard");
const X =
  '<object class ="Xpiece"data="assets/X.png" width="30" height="30"></object>';
const O =
  '<object class = "Opiece"data="assets/o.png" width="30" height="30"></object>';
var boardState = Array(9).fill(null);
function gameloop() {
  for (var i = 0; i <= 8; i++) {
    const board = document.createElement("div");
    game.appendChild(board);
    board.classList.add("square");

    board.setAttribute("tile-id", i);
    board.addEventListener("click", ClickHandle, { once: true });
  }
}

let playergo = "o";

function ChangePlayer() {
  if (playergo === "o") {
    playergo = "x";
  } else {
    playergo = "o";
  }
}
function clicksound() {
  var audio = new Audio("click.wav");
  audio.play();
}

function winsound() {
  var audio = new Audio("win.mp3");
  audio.play();
}

function ClickHandle(e) {
  const clickedTile = e.target;
  const tileId = clickedTile.getAttribute("tile-id");
  clicksound();
  boardState[tileId] = playergo;
  if (playergo === "x") {
    e.target.innerHTML = X;
  } else {
    e.target.innerHTML = O;
  }
  if (Checkwin()) {
    winsound();
    setTimeout(() => alert(playergo.toUpperCase() + " won"), 100);
  } else if (boardState.every((tile) => tile !== null)) {
    winsound();
    setTimeout(() => alert("Hey Its a Tie"), 100);
  } else {
    ChangePlayer();
  }
}

function Checkwin() {
  const winCondn = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winCondn.some((condition) => {
    const [a, b, c] = condition;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}

function reset() {
  game.innerHTML = "";
  boardState.fill(null);
  gameloop();
}

gameloop();
