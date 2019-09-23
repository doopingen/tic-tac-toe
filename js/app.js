//Global variables
const turnNotification = document.getElementById('turn-notif');
const gameDiv = document.getElementById('game-board');
const resetBtn = document.getElementById('reset');
const cpuBtn = document.getElementById('cpuactive');
const square = document.getElementById('game-board').childNodes;
const gameBoardObj = [{
    id: 0,
    tempID: 'div1',
    activeRed: false,
    activeBlack: false
  },{
    id: 1,
    tempID: 'div2',
    activeRed: false,
    activeBlack: false
  },{
    id: 2,
    tempID: 'div3',
    activeRed: false,
    activeBlack: false
  },{
    id: 3,
    tempID: 'div4',
    activeRed: false,
    activeBlack: false
  },{
    id: 4,
    tempID: 'div5',
    activeRed: false,
    activeBlack: false
  },{
    id: 5,
    tempID: 'div6',
    activeRed: false,
    activeBlack: false
  },{
    id: 6,
    tempID: 'div7',
    activeRed: false,
    activeBlack: false
  },{
    id: 7,
    tempID: 'div8',
    activeRed: false,
    activeBlack: false
  },{
    id: 8,
    tempID: 'div9',
    activeRed: false,
    activeBlack: false
  }
];

let count = 1;
let totalRedCol1 = totalRedCol2 = totalRedCol3 = totalRedRow1 = totalRedRow2 = totalRedRow3 = totalRedDiag1 = totalRedDiag2 = totalBlkCol2 = totalBlkCol1 = totalBlkCol3 = totalBlkRow1 = totalBlkRow2 = totalBlkRow3 = totalBlkDiag1 = totalBlkDiag2 = 0;
let cpuActive = false;
let cpuAvailable = true;
let open = [];
let rand = 0;
let gameOver = false;

//Function used to create board as first step in program
function createBoard() {
  for (i = 0; i < gameBoardObj.length; i++){
    createGrid(i);
  }
}


//Handles player click interactions with the gameboard
function playerClickEvent(num) {
  if(gameOver) {
    gameOverEvent(event);
    return false;
  }
  if(!cpuActive && cpuAvailable) {
    cpuAvailable = false;
  }
  if (gameBoardObj[num].activeBlack === true || gameBoardObj[num].activeRed === true) {
    alert("Pick another square");
  } else {
    cpuActive ? CPUConditionizer(num) : moveConditionizer(num);
  }
}


// Hands off to this function that creates relationship with DOM objects and object array.
function createGrid(num) {
  const newDivItem = document.createElement("div");

  newDivItem.setAttribute("id", gameBoardObj[num].id);
  newDivItem.setAttribute("class", gameBoardObj[num].tempID);
  gameDiv.appendChild(newDivItem);
  square[num].addEventListener("click", function(event){
    playerClickEvent(num);
  });
}


//Makes initial decision on how to handle user moves
function moveConditionizer(num) {
  if(count % 2 === 1) {
    move(num, 'p1');
  }else if(count % 2 === 0) {
    move(num, 'p2');
  }
}


//Starts decision making on how CPU handles moves
function CPUConditionizer(num){
  move(num, 'p1');
  CPUMoveChoice();
}


//CPU makes choices based on availability
function CPUMoveChoice() {
  Object.keys(gameBoardObj).forEach(function (sq) {
    if(gameBoardObj[sq].activeRed === false && gameBoardObj[sq].activeBlack === false) {
      open.push(gameBoardObj[sq].id);
      rand = open[Math.floor((Math.random()*open.length))];
    }
  });
  setTimeout(function() {
    move(rand, 'p2');
    open = [];
  }, getRandomArrValue(300,4000));
}


//Function that creates random index value for CPU moves
function getRandomArrValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


//Move logic that is shared between user and CPU
function move(num, player) {
  let gb = gameBoardObj[num];

  if(gameOver) {
    gameOverEvent();
    return false;
  }

  if(player === 'p1') {
    gb.activeRed = true;
    square[num].classList.add("red");
    turnNotification.textContent = "Black Turn";
    turnNotification.style.backgroundColor = "black";
    if (gb.id === 0) {
      totalRedCol1++;
      totalRedDiag1++;
      totalRedRow1++;
    }
    if (gb.id === 1) {
      totalRedCol2++;
      totalRedRow1++;
    }
    if (gb.id === 2) {
      totalRedCol3++;
      totalRedDiag2++;
      totalRedRow1++;
    }
    if (gb.id === 3) {
      totalRedCol1++;
      totalRedRow2++;
    }
    if (gb.id === 4) {
      totalRedCol2++;
      totalRedRow2++;
      totalRedDiag1++;
      totalRedDiag2++;
    }
    if (gb.id === 5) {
      totalRedCol3++;
      totalRedRow2++;
    }
    if (gb.id === 6) {
      totalRedCol1++;
      totalRedRow3++;
      totalRedDiag2++;
    }
    if (gb.id === 7) {
      totalRedCol2++;
      totalRedRow3++;
    }
    if (gb.id === 8) {
      totalRedCol3++;
      totalRedRow3++;
      totalRedDiag1++;
    }
  }

  if(player === 'p2') {
    gb.activeBlack = true;
    square[num].classList.add("black");
    turnNotification.textContent = "Red Turn";
    turnNotification.style.backgroundColor = "red";
    if (gb.id === 0) {
      totalBlkCol1++;
      totalBlkDiag1++;
      totalBlkRow1++;
    }
    if (gb.id === 1) {
      totalBlkCol2++;
      totalBlkRow1++;
    }
    if (gb.id === 2) {
      totalBlkCol3++;
      totalBlkDiag2++;
      totalBlkRow1++;
    }
    if (gb.id === 3) {
      totalBlkCol1++;
      totalBlkRow2++;
    }
    if (gb.id === 4) {
      totalBlkCol2++;
      totalBlkRow2++;
      totalBlkDiag1++;
      totalBlkDiag2++;
    }
    if (gb.id === 5) {
      totalBlkCol3++;
      totalBlkRow2++;
    }
    if (gb.id === 6) {
      totalBlkCol1++;
      totalBlkRow3++;
      totalBlkDiag2++;
    }
    if (gb.id === 7) {
      totalBlkCol2++;
      totalBlkRow3++;
    }
    if (gb.id === 8) {
      totalBlkCol3++;
      totalBlkRow3++;
      totalBlkDiag1++;
    }
  }

  count ++;
  checkForMatch();
}


// Disables game board if a match has been found
function gameOverEvent(event) {
  if(event) {
    event.preventDefault();
    alert("What are you clicking for? The game is over, dufus.");
  }
};


//Logic used to check for game match - Win, Lose or draw.
function checkForMatch() {
    if((totalBlkCol1 === 3 || totalBlkCol2 === 3 || totalBlkCol3 === 3) || (totalBlkDiag1 === 3 || totalBlkDiag2 === 3) || (totalBlkRow1 === 3 || totalBlkRow2 === 3 || totalBlkRow3 === 3) ){
      // alert("Black Wins");
      turnNotification.textContent = "Game Over, Black Wins";
      turnNotification.style.backgroundColor = "blue";
      gameOver = true;
    }else if((totalRedCol1 === 3 || totalRedCol2 === 3 || totalRedCol3 === 3) || (totalRedDiag1 === 3 || totalRedDiag2 === 3) || (totalRedRow1 === 3 || totalRedRow2 === 3 || totalRedRow3 === 3) ){
      // alert("Red Wins");
      turnNotification.textContent = "Game Over, Red Wins";
      turnNotification.style.backgroundColor = "blue";
      gameOver = true;
    }else if (count > 9) {
      // alert("It's a Tie");
      turnNotification.textContent = "Tie Game, Try again";
      turnNotification.style.backgroundColor = "blue";
      gameOver = true;
    }
}


//Function used to reset game board
function activateReset() {
  resetBtn.addEventListener("click", function(event) {
    turnNotification.textContent = "";
    turnNotification.style.backgroundColor = "transparent";
    count = 1;
    open = [];
    totalRedCol1 = totalRedCol2 = totalRedCol3 = totalRedRow1 = totalRedRow2 = totalRedRow3 = totalRedDiag1 = totalRedDiag2 = totalBlkCol2 = totalBlkCol1 = totalBlkCol3 = totalBlkRow1 = totalBlkRow2 = totalBlkRow3 = totalBlkDiag1 = totalBlkDiag2 = 0;
    gameOver = false;
    square.forEach(function(node) {
      node.classList.remove("red", "black");
    });
    gameBoardObj.forEach(function(node) {
      node.activeRed = false;
      node.activeBlack = false;
    })
    cpuAvailable = true;
    cpuBtn.disabled = false;
  });
}


//Function used to activate CPU opponent toggle
function activateCPU() {
  cpuBtn.onclick = function(event) {
    if(cpuAvailable) {
      cpuActive = !cpuActive;
    }
    else {
      event.preventDefault();
      cpuBtn.disabled = true;
    }
  }
}


//Initalized functions and events that are active on DOM ready
createBoard();
activateReset();
activateCPU();
