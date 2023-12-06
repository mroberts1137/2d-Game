import Entity from './entity.js';

// export class Enemy extends Entity {
//   constructor(x, y) {
//     super(x, y);
//     this.spriteScale = 0.5;
//     this.width = 100;
//     this.height = 100;

//     // coordinates/hitbox
//     this.hitbox = {
//       x: x,
//       y: y,
//       width: 100,
//       height: 100,
//       scale: 0.75
//     };

//     // animation frame & speed
//     this.frame = 0;
//     this.animationSpeed = Math.floor(Math.random() * 4) + 1;
//   }

//   update() {
//     this.gameFrame++;
//     this.move();
//     this.animateFrame();
//     // update hitbox
//     this.hitbox.x = this.x + (1 - this.hitbox.scale) * this.width * 0.5;
//     this.hitbox.y = this.y + (1 - this.hitbox.scale) * this.height * 0.5;

//     // out-of-bounds
//     if (this.x > window.global.CANVAS_WIDTH) this.x = -this.width;
//     if (this.x < -this.width) this.x = window.global.CANVAS_WIDTH;
//     if (this.y > window.global.CANVAS_HEIGHT) this.y = -this.height;
//     if (this.y < -this.height) this.y = window.global.CANVAS_HEIGHT;
//   }
//   move() {}
//   animateFrame() {
//     if (this.gameFrame % (window.global.TICK_SPEED * this.animationSpeed) === 0)
//       this.frame = (this.frame + 1) % this.animationFrames;
//   }
//   draw() {
//     if (window.debug.DRAW_HITBOX)
//       window.global.ctx.strokeRect(
//         this.hitbox.x,
//         this.hitbox.y,
//         this.hitbox.width,
//         this.hitbox.height
//       );
//     window.global.ctx.drawImage(
//       this.image,
//       this.frame * this.spriteWidth,
//       0,
//       this.spriteWidth,
//       this.spriteHeight,
//       this.x,
//       this.y,
//       this.width,
//       this.height
//     );
//   }
// }

export class Bat extends Entity {
  constructor(x, y) {
    super(x, y);
    // sprite info
    this.image.src = 'assets/sprites/enemy1.png';
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.spriteScale = 0.5;

    // sprite-sheet animations/frames
    this.animationStates = [
      {
        name: 'idle',
        frames: 4
      }
    ];
    this.getSpriteAnimations();

    // coordinates/hitbox
    this.width = this.spriteWidth * this.spriteScale;
    this.height = this.spriteHeight * this.spriteScale;
    this.hitbox.scale = 0.75;
    this.hitbox.width = this.width * this.hitbox.scale;
    this.hitbox.height = this.height * this.hitbox.scale;
    this.hitbox.xOffset = (1 - this.hitbox.scale) * this.width * 0.5;
    this.hitbox.yOffset = (1 - this.hitbox.scale) * this.height * 0.5;
    this.hitbox.x = this.x + this.hitbox.xOffset;
    this.hitbox.y = this.y + this.hitbox.yOffset;

    // enemy-specific properties
    this.type = 'bat';
    this.behavior = 'shake';
    this.maxSpeed = 10;
    this.speed = (Math.random() * 2 - 1) * this.maxSpeed;
    this.direction = Math.random() * 360;
  }

  move() {
    this.direction = Math.random() * 360;
    this.x += this.speed * Math.cos((this.direction * Math.PI) / 180);
    this.y -= this.speed * Math.sin((this.direction * Math.PI) / 180);
  }
}

export class Bat2 extends Entity {
  constructor(x, y) {
    super(x, y);
    // sprite info
    this.image.src = 'assets/sprites/enemy2.png';
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.spriteScale = 0.5;

    // sprite-sheet animations/frames
    this.animationStates = [
      {
        name: 'idle',
        frames: 4
      }
    ];
    this.getSpriteAnimations();

    // coordinates/hitbox
    this.width = this.spriteWidth * this.spriteScale;
    this.height = this.spriteHeight * this.spriteScale;
    this.hitbox.scale = 0.75;
    this.hitbox.width = this.width * this.hitbox.scale;
    this.hitbox.height = this.height * this.hitbox.scale;
    this.hitbox.xOffset = (1 - this.hitbox.scale) * this.width * 0.5;
    this.hitbox.yOffset = (1 - this.hitbox.scale) * this.height * 0.5;
    this.hitbox.x = this.x + this.hitbox.xOffset;
    this.hitbox.y = this.y + this.hitbox.yOffset;

    // enemy-specific properties
    this.type = 'bat2';
    this.behavior = 'leftSine';
    this.maxSpeed = 10;
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

export class Ghost extends Entity {
  constructor(x, y) {
    super(x, y);
    // sprite info
    this.image.src = 'assets/sprites/enemy3.png';
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.spriteScale = 0.5;

    // sprite-sheet animations/frames
    this.animationStates = [
      {
        name: 'idle',
        frames: 4
      }
    ];
    this.getSpriteAnimations();

    // coordinates/hitbox
    this.width = this.spriteWidth * this.spriteScale;
    this.height = this.spriteHeight * this.spriteScale;
    this.hitbox.scale = 0.75;
    this.hitbox.width = this.width * this.hitbox.scale;
    this.hitbox.height = this.height * this.hitbox.scale;
    this.hitbox.xOffset = (1 - this.hitbox.scale) * this.width * 0.5;
    this.hitbox.yOffset = (1 - this.hitbox.scale) * this.height * 0.5;
    this.hitbox.x = this.x + this.hitbox.xOffset;
    this.hitbox.y = this.y + this.hitbox.yOffset;

    // enemy-specific properties
    this.type = 'ghost';
    this.behavior = 'leftSine';
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

export class Wheel extends Entity {
  constructor(x, y) {
    super(x, y);
    // sprite info
    this.image.src = 'assets/sprites/enemy4.png';
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.spriteScale = 0.5;

    // sprite-sheet animations/frames
    this.animationStates = [
      {
        name: 'idle',
        frames: 7
      }
    ];
    this.getSpriteAnimations();

    // coordinates/hitbox
    this.width = this.spriteWidth * this.spriteScale;
    this.height = this.spriteHeight * this.spriteScale;
    this.hitbox.scale = 0.75;
    this.hitbox.width = this.width * this.hitbox.scale;
    this.hitbox.height = this.height * this.hitbox.scale;
    this.hitbox.xOffset = (1 - this.hitbox.scale) * this.width * 0.5;
    this.hitbox.yOffset = (1 - this.hitbox.scale) * this.height * 0.5;
    this.hitbox.x = this.x + this.hitbox.xOffset;
    this.hitbox.y = this.y + this.hitbox.yOffset;

    // enemy-specific properties
    this.type = 'wheel';
    this.behavior = 'leftSine';
    this.maxSpeed = 10;
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
