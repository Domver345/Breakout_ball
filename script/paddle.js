export class Paddle {
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 20;
    this.position = {
      x: (game.canvas.width - this.width) / 2,
      y: game.canvas.height - this.height - 10
    };
    this.maxWidth = game.canvas.width;
    this.initInput();
  }

  initInput() {
    this.game.canvas.addEventListener('mousemove', e => {
      const rect = this.game.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      this.position.x = mouseX - this.width / 2;

      // Clamp within canvas
      this.position.x = Math.max(0, Math.min(this.position.x, this.maxWidth - this.width));
    });
  }

  update() {
    // Movement is handled by mouse, no update needed
  }

  draw(ctx) {
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}