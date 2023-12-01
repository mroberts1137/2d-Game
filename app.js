/** @type {HTMLCanvasElement} */

import { Enemy, Bat, Bat2, Ghost, Wheel } from './enemy.js';
import { Player } from './player.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 600);
const TICK_SPEED = 5;
let gameFrame = 0;

window.global = {
  TICK_SPEED: TICK_SPEED,
  CANVAS_WIDTH: CANVAS_WIDTH,
  CANVAS_HEIGHT: CANVAS_HEIGHT,
  ctx: ctx
};

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'assets/backgrounds/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'assets/backgrounds/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'assets/backgrounds/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'assets/backgrounds/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'assets/backgrounds/layer-5.png';

class Layer {
  constructor(image, speedModifier) {
    this.image = image;
    this.speedModifier = speedModifier;
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.speed = TICK_SPEED * this.speedModifier;
  }

  update() {
    this.speed = TICK_SPEED * this.speedModifier;
    if (this.x <= -this.width) this.x = 0;
    this.x = Math.floor(this.x - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

/////////////////////////////////////////////////////////////////
// GAME INITIALIZE
/////////////////////////////////////////////////////////////////
window.addEventListener('load', () => {
  const player = new Player(150, 250);
  player.playerState = 'run';
  const bat = new Bat(200, 100);
  const bat2 = new Bat2(200, 100);
  const ghost = new Ghost(200, 100);
  const wheel = new Wheel(200, 100);

  const layer1 = new Layer(backgroundLayer1, 0.2);
  const layer2 = new Layer(backgroundLayer2, 0.4);
  const layer3 = new Layer(backgroundLayer3, 0.6);
  const layer4 = new Layer(backgroundLayer4, 0.8);
  const layer5 = new Layer(backgroundLayer5, 1);

  const objects = [];
  objects.push(layer1, layer2, layer3, layer4, layer5);
  objects.push(player, bat, bat2, ghost, wheel);

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    objects.forEach((object) => {
      object.update();
      object.draw();
    });

    gameFrame++;
    requestAnimationFrame(animate);
  }

  /////////////////////////////////////////////////////////////////
  // GAME LOOP
  /////////////////////////////////////////////////////////////////

  animate();
});
