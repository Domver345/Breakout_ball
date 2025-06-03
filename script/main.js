import { Game } from './game.js';

// Background Music
const bgMusic = new Audio('assets/sounds/bg-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.4;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const game = new Game(canvas, ctx);

game.start();
canvas.addEventListener("click", () => {
  if (!game.running && game.showGameOver) {
    game.reset();
    game.start();
    
  }
  if (bgMusic.paused) {
    bgMusic.play();
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.paddle.draw(ctx);
  game.ball.draw(ctx);
  game.bricks.forEach(b => b.draw(ctx));

  if (game.showGameOver) {
    ctx.fillStyle = "#f74b0d";
    ctx.font = "20px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("Game Over - Click to Restart", canvas.width / 2, canvas.height / 2);
    
  }

  // ✅ Update HUD labels
  document.getElementById("level-label").textContent = `Level: ${game.levelIndex + 1}`;
  document.getElementById("score-label").textContent = `Score: ${game.score}`;

  requestAnimationFrame(draw);
}

draw();

let isMuted = false;

document.getElementById('muteBtn').addEventListener('click', () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  document.getElementById('muteBtn').textContent = isMuted ? '🔊' : '🔇';
});

// bgMusic.play();
