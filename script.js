const game = document.getElementById('game');
const player = document.getElementById('player');
const scoreText = document.getElementById('score');
let score = 0;

// Move player with arrow keys
document.addEventListener('keydown', (e) => {
  const currentLeft = player.offsetLeft;
  if (e.key === 'ArrowLeft' && currentLeft > 0) {
    player.style.left = currentLeft - 30 + 'px';
  } else if (e.key === 'ArrowRight' && currentLeft < window.innerWidth - player.offsetWidth) {
    player.style.left = currentLeft + 30 + 'px';
  }
});

// Return random color
function randomColor() {
  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Create and animate a falling block
function spawnBlock() {
  const block = document.createElement('div');
  block.classList.add('block');
  const color = randomColor();
  block.style.backgroundColor = color;
  block.style.left = Math.random() * (window.innerWidth - 30) + 'px';
  block.style.animationDuration = (2 + Math.random() * 2) + 's';
  game.appendChild(block);

  const fallTime = parseFloat(block.style.animationDuration) * 1000;

  // Remove block after animation
  setTimeout(() => {
    if (game.contains(block)) {
      game.removeChild(block);
    }
  }, fallTime);

  // Check for collision
  const checkCollision = setInterval(() => {
    const blockRect = block.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      blockRect.bottom >= playerRect.top &&
      blockRect.left < playerRect.right &&
      blockRect.right > playerRect.left
    ) {
      score++;
      scoreText.textContent = 'Score: ' + score;
      game.removeChild(block);
      clearInterval(checkCollision);
    }
  }, 30);
}

// Spawn a block every 800ms
setInterval(spawnBlock, 800);
