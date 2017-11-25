const xImage = 'img/x.png'
const yImage = 'img/y.png'
const boxes = document.querySelectorAll('#game-grid div');
const emptyBoxes = [];

for(const box of boxes) {
  box.addEventListener('click', yourTurn);
  emptyBoxes.push(box);
}

function yourTurn(event) {
  const container = event.currentTarget;
  const image = document.createElement('img');
  image.src = xImage;
  container.appendChild(image);
  container.removeEventListener('click', yourTurn);

  //remove container box that is no longer empty from emptyBoxes arrray.
  const indexToRemove = emptyBoxes.indexOf(container);
  emptyBoxes.splice(indexToRemove, 1);

  artificialIntelligenceTurn();
}

function artificialIntelligenceTurn() {
  const index = Math.floor(Math.random() * emptyBoxes.length);
  const freeSpace = emptyBoxes[index];

  //remove random index box that is no longer empty from emptyBoxes array.
  emptyBoxes.splice(index, 1);
  
  const image = document.createElement('img');
  image.src = yImage;
  freeSpace.removeEventListener('click', yourTurn);
  freeSpace.appendChild(image);
}