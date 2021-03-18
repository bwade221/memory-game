const gameContainer = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;
  console.log("you just clicked", event.target);

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0]

  if (!firstCard || !secondCard) {
    currentCard.classList.add("flipped");
    firstCard = firstCard || currentCard;
    secondCard = currentCard === firstCard ? null : currentCard;
  }

  if(firstCard && secondCard) {
      noClicking = true;
      let card1Color = firstCard.className;
      let card2Color = secondCard.className;
    

    if (card1Color === card2Color) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      noClicking = false
    } else {
      setTimeout(function () {
          firstCard.style.backgroundColor = "";
          secondCard.style.backgroundColor = "";
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard = null;
          secondCard = null;
          noClicking = false
        }, 1500);
    };
  };
}



// when the DOM loads
createDivsForColors(shuffledColors);
