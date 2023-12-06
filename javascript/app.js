/** @type {HTMLCanvasElement} */

import { Bat, Bat2, Ghost, Wheel } from './enemy.js';
import Player from './player.js';
import Layer from './background.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 600);

const pauseButton = document.querySelector('#pauseButton');
pauseButton.addEventListener('click', pauseGame);

/////////////////////////////////////////////////////////////////
// GLOBAL PROPERTIES
/////////////////////////////////////////////////////////////////

window.global = {
  TICK_SPEED: 5,
  CANVAS_WIDTH: CANVAS_WIDTH,
  CANVAS_HEIGHT: CANVAS_HEIGHT,
  ctx: ctx,
  FPS: 60
};

window.debug = {
  DRAW_HITBOX: false
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

/////////////////////////////////////////////////////////////////
// MAIN GAME FUNCTIONS
/////////////////////////////////////////////////////////////////

function pauseGame() {
  if (!gamePaused) {
    gamePaused = true;
    pauseButton.innerText = 'Play';
  } else {
    gamePaused = false;
    pauseButton.innerText = 'Pause';
  }
}

/////////////////////////////////////////////////////////////////
// GAME INITIALIZE
/////////////////////////////////////////////////////////////////

let gameFrame = 0;
let gamePaused = false;
let currentTime = 0;
let prevTime = 0;

// wait until all assets are fully loaded before starting the game
window.addEventListener('load', () => {
  const player = new Player(150, 250);
  player.state = 'run';
  const bat = new Bat(200, 100);
  const bat2 = new Bat2(200, 100);
  const ghost = new Ghost(200, 100);
  const wheel = new Wheel(200, 100);

  const layer1 = new Layer(backgroundLayer1, 0.2);
  const layer2 = new Layer(backgroundLayer2, 0.4);
  const layer3 = new Layer(backgroundLayer3, 0.6);
  const layer4 = new Layer(backgroundLayer4, 0.8);
  const layer5 = new Layer(backgroundLayer5, 1);

  const enemies = [];
  const backgrounds = [];
  backgrounds.push(layer1, layer2, layer3, layer4, layer5);
  enemies.push(bat, bat2, ghost, wheel);

  function animate(timestamp) {
    if (!gamePaused) {
      let deltaTime = timestamp - prevTime;
      prevTime = timestamp;

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // iterate over all game objects and update/draw
      [...backgrounds, player, ...enemies].forEach((object) => {
        object.update(deltaTime);
        object.draw(deltaTime);
      });

      player.collisionId = 0;
      enemies.forEach((enemy) => {
        if (player.checkCollision(enemy.hitbox)) player.collisionId = 1;
      });

      gameFrame++;
    }
    requestAnimationFrame(animate);
  }

  /////////////////////////////////////////////////////////////////
  // GAME LOOP
  /////////////////////////////////////////////////////////////////

  animate(0);
});
