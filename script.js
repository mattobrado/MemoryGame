const gameContainer = document.getElementById("game");

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

// firstCard holds the first card we are finding a match for
// secondCard holds our guess of which card matches first card
// initilaized to null because we haven't clicked a card yet
let firstCard = null;
let secondCard = null;
// cardsToHide holds cards we want to hide later
// so that we can re-assign firstCard and secondCard
let cardsToHide = [];
// we need a global timout variable to be able to clear the timer at any time
let timeout;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// function to hide card
function hideCard(card){
  // if we got passed null of undefined do nothing
  if (card == null){
    return;
  }
  // if we got passed a matched card do nothing
  if (card.getAttribute('data-matched')){
    return;
  }
  // set background color of card to null
  card.style.backgroundColor = null;
}

// function to revael card
function revealCard(card){
  // set backgroundcolor to className
  card.style.backgroundColor = card.className;
}

// TODO: Implement this function!
function handleCardClick(event) {

  // you can use event.target to see which element was clicked
  const clickedCard = event.target;
  console.log("you just clicked", clickedCard);

  // if the clicked card is already matched, do not coninue (return)
  if (clickedCard.getAttribute('data-matched')){
    console.log("You already matched that card");
    return;
  }

  // if we have a value in firstCard
  if (firstCard !== null) {

    // if second card is not the exact same card
    if (clickedCard !== firstCard) {

      // store clickedCard in secondCard
      secondCard = clickedCard;
      // reveal card
      revealCard(secondCard);

      // check for match by camparing classNames
      if (firstCard.className === secondCard.className){

        // match found
        console.log("It's a Match!")

        // set matched data attribute so we can't choose these cards again
        firstCard.setAttribute('data-matched',true);
        secondCard.setAttribute('data-matched',true);
      }
      else {
        
        // hide cards
        // we need to store the cards we want to hide in an array 
        // because we will be setting the references 
        // firstCard, secondCard = null befrore the timout function
        // is called
        cardsToHide.push(firstCard);
        cardsToHide.push(secondCard);
        // shift out  2 elements from front, cardsToHide acts as a queue
        timeout = setTimeout(function() {
          hideCard(cardsToHide.shift());
          hideCard(cardsToHide.shift());
        }, 1000);
      }

      // reset first and second card to null, so we can start over
      firstCard = null;
      secondCard = null;
    }
  }

  // there is no card stored in firstCard
  else {
    // hide cards imediately
    clearTimeout(timeout);
    hideCard(cardsToHide.shift());
    hideCard(cardsToHide.shift());
    // store clickedCard
    firstCard = clickedCard;
    // reveal card
    revealCard(firstCard);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */