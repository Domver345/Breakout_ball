import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { createBricks } from './brick.js';
import { levels } from './levels.js';

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.level = 0;
    this.levelIndex = 0;     
    this.score = 0;
    this.reset();
  }

  reset(isNewGane=false) {
    if (isNewGane) {
      this.level=0;
      this.score=0;
    }
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.bricks = createBricks(this, levels[this.level]);
    this.running = true;
  }

  start() {
    requestAnimationFrame(() => this.loop());
  }

  loop() {
    this.update();
    this.draw();
    if (this.running) requestAnimationFrame(() => this.loop());
  }

  update() {
    this.paddle.update();
    this.ball.update(this.bricks);
    if (this.bricks.length === 0) {
      this.level++;
      this.levelIndex++;
      // this.loadLevel();
      if (this.level < levels.length) {
        this.reset();
      } else {
        this.running = false;
        alert("🎉 You won all levels!");
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paddle.draw(this.ctx);
    this.ball.draw(this.ctx);
    this.bricks.forEach(brick => brick.draw(this.ctx));
  }
}
