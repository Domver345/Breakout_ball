export class Paddle {
  constructor(game) {
    this.width = 120;
    this.height = 20;
    this.position = {
      x: (game.canvas.width - this.width) / 2,
      y: game.canvas.height - this.height - 10
    };
    this.speed = 7;
    this.maxWidth = game.canvas.width;
    this.left = false;
    this.right = false;
    this.initInput();
  }

  initInput() {
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') this.left = true;
      if (e.key === 'ArrowRight') this.right = true;
    });

    document.addEventListener('keyup', e => {
      if (e.key === 'ArrowLeft') this.left = false;
      if (e.key === 'ArrowRight') this.right = false;
    });
  }

  update() {
    if (this.left) this.position.x -= this.speed;
    if (this.right) this.position.x += this.speed;

    this.position.x = Math.max(0, Math.min(this.position.x, this.maxWidth - this.width));
  }

  draw(ctx) {
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}