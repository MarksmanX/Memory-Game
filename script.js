const gameContainer = document.getElementById("game");
var score = 0;

var cardList = [
  "robinhood",
  "alice",
  "mickeymouse",
  "elsa",
  "stitch",
  "peterpan",
  "cinderella",
  "belle",
  "simba",
  "morph"
];

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var cardSelect1;
var cardSelect2;

window.onload = function() {
  shuffle();
  startgame();
}

// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle() {
  //double each card
  cardSet =cardList.concat(cardList);
  let counter = cardSet.length;

  //shuffle
  for (let i = 0; i < counter; i++) {
    let j = Math.floor(Math.random() * cardSet.length);
    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
}

function startgame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cardImg = cardSet.pop();
      row.push(cardImg);

      //make an <img> tag and assign ids like "0-1"
      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = cardImg + ".png";
      card.classList.add("card");
      card.addEventListener("click", selectCard);
      gameContainer.appendChild(card);
    }
    board.push(row);
  }
  console.log(board);
  hideCards();
}

//TODO: Write a start button function
//document.getElementById("startbtn").addEventListener("click", startgame());

function hideCards() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = "back.png";
    }
  }
}

function selectCard(event) {
  // you can use event.target to see which element was clicked
  if (this.src.includes("back")) {
    if (!cardSelect1) {
      cardSelect1 = this;

      let coords = cardSelect1.id.split("-"); // 0-1 -> ["0", "1"]
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);
      cardSelect1.src = board[r][c] +".png";
    }
    else if (!cardSelect2 && this != cardSelect1) {
      cardSelect2 = this;

      let coords = cardSelect2.id.split("-"); // 0-1 -> ["0", "1"]
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      cardSelect2.src = board[r][c] + ".png";
      if(cardSelect1.src != cardSelect2.src) {
        setTimeout(noMatch, 1000);
      }
      else {
        cardSelect1.style.opacity = "1.0";
        cardSelect2.style.opacity = "1.0";
        cardSelect1 = null;
        cardSelect2 = null;
        score++;
        document.getElementById("score").innerText = score;
      }
    }
  }
}

function noMatch() {
    cardSelect1.src = "back.png";
    cardSelect2.src = "back.png";
    score++;
    document.getElementById("score").innerText = score;
  cardSelect1 = null;
  cardSelect2 = null;
}

