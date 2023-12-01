export class Enemy {
  constructor(x, y) {
    this.showBorder = false;
    this.gameFrame = 0;
    this.image = new Image();
    this.spriteScale = 2;
    (this.x = x), (this.y = y);
    this.frame = 0;
    this.animationSpeed = Math.floor(Math.random() * 4) + 1;
  }

  update() {
    this.gameFrame++;
    this.move();
    this.animateFrame();

    // out-of-bounds
    if (this.x > window.global.CANVAS_WIDTH) this.x = -this.width;
    if (this.x < -this.width) this.x = window.global.CANVAS_WIDTH;
    if (this.y > window.global.CANVAS_HEIGHT) this.y = -this.height;
    if (this.y < -this.height) this.y = window.global.CANVAS_HEIGHT;
  }
  move() {}
  animateFrame() {
    if (this.gameFrame % (window.global.TICK_SPEED * this.animationSpeed) === 0)
      this.frame > this.animationFrames ? (this.frame = 0) : this.frame++;
  }
  draw() {
    if (this.showBorder)
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    window.global.ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Bat extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.image.src = 'assets/sprites/enemy1.png';
    this.behavior = 'shake';
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.maxSpeed = 10;
    this.animationFrames = 4;

    this.width = this.spriteWidth / this.spriteScale;
    this.height = this.spriteHeight / this.spriteScale;

    this.speed = (Math.random() * 2 - 1) * this.maxSpeed;
    this.direction = Math.random() * 360;
  }

  move() {
    this.direction = Math.random() * 360;
    this.x += this.speed * Math.cos((this.direction * Math.PI) / 180);
    this.y -= this.speed * Math.sin((this.direction * Math.PI) / 180);
  }
}

export class Bat2 extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.image.src = 'assets/sprites/enemy2.png';
    this.behavior = 'leftSine';
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.maxSpeed = 10;
    this.animationFrames = 4;

    this.width = this.spriteWidth / this.spriteScale;
    this.height = this.spriteHeight / this.spriteScale;

    this.speed = Math.random() * this.maxSpeed;
    this.direction = 180;
    this.amplitude = 10 * Math.random();
    this.angularSpeed = 10 * Math.random();
    this.angle = 0;
  }

  move() {
    this.x += this.speed * Math.cos((this.direction * Math.PI) / 180);
    this.y -= this.amplitude * Math.sin(((this.angle % 360) * Math.PI) / 180);
    this.angle += this.angularSpeed;
  }
}

export class Ghost extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.image.src = 'assets/sprites/enemy3.png';
    this.behavior = 'leftSine';
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.maxSpeed = 10;
    this.animationFrames = 4;

    this.width = this.spriteWidth / this.spriteScale;
    this.height = this.spriteHeight / this.spriteScale;

    this.angularSpeed = 4 * Math.random() + 1;
    this.angle = 0;
    this.nx = 1;
    this.ny = 2;
  }

  move() {
    this.x =
      ((window.global.CANVAS_WIDTH - this.width) / 2) *
      (Math.sin((this.nx * (this.angle % 360) * Math.PI) / 180) + 1);
    this.y =
      ((window.global.CANVAS_HEIGHT - this.height) / 2) *
      (Math.sin((this.ny * (this.angle % 360) * Math.PI) / 180) + 1);
    this.angle += this.angularSpeed;
  }
}

export class Wheel extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.image.src = 'assets/sprites/enemy4.png';
    this.behavior = 'leftSine';
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.maxSpeed = 10;
    this.animationFrames = 7;

    this.width = this.spriteWidth / this.spriteScale;
    this.height = this.spriteHeight / this.spriteScale;

    this.moveInterval = Math.floor(Math.random() * 200 + 50);
    this.newX = this.x;
    this.newY = this.y;
  }

  move() {
    if (this.gameFrame % this.moveInterval === 0) {
      this.newX = Math.random() * (window.global.CANVAS_WIDTH - this.width);
      this.newY = Math.random() * (window.global.CANVAS_HEIGHT - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 20;
    this.y -= dy / 20;
  }
}
