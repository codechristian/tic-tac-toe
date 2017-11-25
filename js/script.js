const xImage = 'img/x.png'
const yImage = 'img/y.png'
const boxes = document.querySelectorAll('#game-grid div');
const emptyBoxes = [];
//maps box number with owner either user 'x' or ai 'o'
const takenBoxes = {};

for(const box of boxes) {
  box.addEventListener('click', yourTurn);
  emptyBoxes.push(box);
}

function yourTurn(event) {
  assignSpace(event.currentTarget, 'x');

  if(isGameOver()) {
    displayWinner();
  } else {
    artificialIntelligenceTurn();
  }
}

function artificialIntelligenceTurn() {
  const index = Math.floor(Math.random() * emptyBoxes.length);
  const freeSpace = emptyBoxes[index];

  assignSpace(freeSpace, 'o');
  
  if(isGameOver()) {
    displayWinner();
  }
}

function assignSpace(space, owner) {
  const image = document.createElement('img');

  if(owner === 'x') {
    image.src = xImage;
  } else {
    image.src = yImage;
  }

  space.appendChild(image);
  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = emptyBoxes.indexOf(space);
  emptyBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', yourTurn);
}

function isGameOver() {
  return emptyBoxes.length === 0 || getWinner() !== null;
}

function displayWinner() {
  const winner = getWinner();

  const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');
  if(winner === 'x') {
    header.textContent = 'You win!';
  } else if (winner === 'o') {
    header.textContent = 'You lose :(';
  } else {
    header.textContent = 'Tie'
  }
  resultContainer.appendChild(header);

  //remove remaining event listeners
  for(const box of emptyBoxes) {
    box.removeEventListener('click', yourTurn);
  }
}

function checkBoxes(one, two, three) {
  if (takenBoxes[one] !== undefined &&
      takenBoxes[one] === takenBoxes[two] &&
      takenBoxes[two] === takenBoxes[three]) {
    return takenBoxes[one];
  }
  return null;
}

//returns 'x', 'o', or 'null' for no winner yet.
function getWinner() {
  for (let col = 0; col < 3; col++) {
    const offset = col * 3;

    //check rows and columns.
    let result = checkBoxes(offset, 1 + offset, 2 + offset) ||
        checkBoxes(col, 3 + col, 6 + col);
    if(result) {
      return result;
    }
  }

  //check diagonals
  return checkBoxes(0, 4, 8) || checkBoxes(2, 4, 6);


  /*//check rows
  let rowResult = checkBoxes('one', 'two', 'three') ||
      checkBoxes('four', 'five', 'six') ||
      checkBoxes('seven', 'eight', 'nine');

  //check columns
  let colResult = checkBoxes('one', 'four', 'seven') ||
      checkBoxes('two', 'five', 'eight') ||
      checkBoxes('three', 'six', 'nine');

  //check diagonal
  let diagonalResult = checkBoxes('one', 'five', 'nine') ||
      checkBoxes('three', 'five', 'seven');
  
  return rowResult || colResult || diagonalResult; */
}