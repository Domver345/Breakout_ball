export class Brick {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.fillStyle = '#f87171';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = '#ef4444';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

export function createBricks(game, layout) {
  const bricks = [];
  const rows = layout.length;
  const cols = layout[0].length;
  const brickWidth = game.canvas.width / cols;
  const brickHeight = 25;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (layout[row][col]) {
        const x = col * brickWidth;
        const y = row * (brickHeight + 5) + 30;
        bricks.push(new Brick(x, y, brickWidth - 5, brickHeight));
      }
    }
  }

  return bricks;
}