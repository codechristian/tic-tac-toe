const xImage = 'img/x.png'
const yImage = 'img/y.png'

function markWithX(event) {
  const container = event.currentTarget;
  const image = document.createElement('img');
  image.src = xImage;
  container.appendChild(image);
  container.removeEventListener('click', markWithX);
}

const boxes = document.querySelectorAll('#game-grid div');

for(const box of boxes) {
  box.addEventListener('click', markWithX);
}