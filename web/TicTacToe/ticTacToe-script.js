//defaults
let userHistoryJson;
let count = 1;
let table = [
  { place: "r1c1", value: "-" },
  { place: "r1c2", value: "-" },
  { place: "r1c3", value: "-" },
  { place: "r2c1", value: "-" },
  { place: "r2c2", value: "-" },
  { place: "r2c3", value: "-" },
  { place: "r3c1", value: "-" },
  { place: "r3c2", value: "-" },
  { place: "r3c3", value: "-" },
];
let color = "black";
let player = "X";

//functions
function init() {
  if (localStorage.getItem("TicTacHistory") == null) {
    userHistoryJson = JSON.stringify(table);
    localStorage.setItem("TicTacHistory", userHistoryJson);
  } else {
    userHistoryJson = localStorage.getItem("TicTacHistory");
    table = JSON.parse(userHistoryJson);
  }
}
function checkWin() {
  //diagnal
  let c1 = document.querySelector(`#r1c1`).innerText;
  let c2 = document.querySelector(`#r2c2`).innerText;
  let c3 = document.querySelector(`#r3c3`).innerText;
  if (c1 == c2 && c2 == c3 && c1 != "-") {
    return true;
  }
  c1 = document.querySelector(`#r1c3`).innerText;
  c2 = document.querySelector(`#r2c2`).innerText;
  c3 = document.querySelector(`#r3c1`).innerText;
  if (c1 == c2 && c2 == c3 && c1 != "-") {
    return true;
  }
  for (let i = 1; i <= 3; i++) {
    //row win
    c1 = document.querySelector(`#r${i}c1`).innerText;
    c2 = document.querySelector(`#r${i}c2`).innerText;
    c3 = document.querySelector(`#r${i}c3`).innerText;
    if (c1 == c2 && c2 == c3 && c1 != "-") {
      return true;
    }
    //culomn win
    c1 = document.querySelector(`#r1c${i}`).innerText;
    c2 = document.querySelector(`#r2c${i}`).innerText;
    c3 = document.querySelector(`#r3c${i}`).innerText;
    if (c1 == c2 && c2 == c3 && c1 != "-") {
      return true;
    }
  }
  return false;
}
function updatePlayer() {
  if (count % 2 == 0) {
    player = "X";
    color = "green";
  } else {
    player = "O";
    color = "red";
  }
  count++;
}
function checkCanPlay() {
  let emptyCounter = 0;
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      if (document.querySelector(`#r${i}c${j}`).innerText == "-") {
        emptyCounter++;
      }
    }
  }
  if (emptyCounter > 0) {
    return true;
  }
  return false;
}
function disableCells() {
  for (let i of table) {
    let place = i.place;
    document.querySelector(`#${place}`).onclick = "";
  }
}
function printBoard() {
  document.querySelector("#top").innerHTML = `player is: ${player}`;
  updatePlayer();
  document.querySelector("#board").innerHTML = "";
  document.querySelector("#prompt").textContent = "";
  for (let i in table) {
    let place = table[i].place;
    let value = table[i].value;
    document.querySelector(
      `#board`
    ).innerHTML += `<div class="symbol" id="${place}" onclick="addSymbol(this)">${value}</div>`;
  }
  document.querySelector("#btnReset").style = "display:none";
  colorAllCells();
}
function resetTable() {
  table = [
    { place: "r1c1", value: "-" },
    { place: "r1c2", value: "-" },
    { place: "r1c3", value: "-" },
    { place: "r2c1", value: "-" },
    { place: "r2c2", value: "-" },
    { place: "r2c3", value: "-" },
    { place: "r3c1", value: "-" },
    { place: "r3c2", value: "-" },
    { place: "r3c3", value: "-" },
  ];
  userHistoryJson = JSON.stringify(table);
  localStorage.setItem("TicTacHistory", userHistoryJson);
  printBoard();
}
function updateTableValue(place) {
  for (let i of table) {
    if (i.place == place) {
      i.value = player;
    }
  }
}
function colorAllCells() {
  for (i of table) {
    let cell = document.querySelector(`#${i.place}`);
    if (i.value != "-") {
      document.querySelector("#btnReset").style = "display:block";
    }
    if (i.value == "X") {
      cell.style = "color:green";
    } else if (i.value == "O") {
      cell.style = "color:red";
    }
  }
}
function addSymbol(cell) {
  if (cell.innerText == "-") {
    document.querySelector("#top").innerHTML = `player is: ${player}`;
    updatePlayer();
    cell.innerText = player;

    updateTableValue(cell.id);
    colorAllCells();
    userHistoryJson = JSON.stringify(table);
    localStorage.setItem("TicTacHistory", userHistoryJson);
    if (checkWin()) {
      // if someone won
      document.querySelector("#prompt").innerText = `the winner is: ${player}!`;
      disableCells();
    } else if (!checkCanPlay()) {
      //if its a tie
      document.querySelector("#prompt").innerText = `it's a tie!`;
      disableCells();
    }
  }
}

//print the board when game starts
init();
printBoard();
