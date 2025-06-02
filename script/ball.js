export class Ball {
  constructor(game) {
    this.game = game;
    this.radius = 10;
    this.reset();
  }

  reset() {
    this.position = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 };
    this.speed = { x: 4, y: -4 };
  }

  update(bricks) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // Wall collisions
    if (this.position.x <= 0 || this.position.x >= this.game.canvas.width) this.speed.x *= -1;
    if (this.position.y <= 0) this.speed.y *= -1;

    // Paddle collision
    const paddle = this.game.paddle;
    if (
      this.position.y + this.radius >= paddle.position.y &&
      this.position.x >= paddle.position.x &&
      this.position.x <= paddle.position.x + paddle.width
    ) {
      this.speed.y *= -1;
      this.position.y = paddle.position.y - this.radius;
      this.game.score += 1;
    }

    // Bottom out
    if (this.position.y > this.game.canvas.height) {
      this.game.running = false;
      this.game.showGameOver = true;
    }

    // Brick collision
    for (let i = bricks.length - 1; i >= 0; i--) {
      const b = bricks[i];
      if (
        this.position.x > b.x && this.position.x < b.x + b.width &&
        this.position.y > b.y && this.position.y < b.y + b.height
      ) {
        this.speed.y *= -1;
        bricks.splice(i, 1);
        this.game.score += 10;
        break;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}