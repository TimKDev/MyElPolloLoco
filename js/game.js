/* Global Variables: */

/** 
 * Contains the active World Object. 
 */
let world;
let canvas;
let keyboard = new Keyboard();

/**
 * This function is called onload of the body element. It genrates a new Canvas object and a 
 * new World object. Then it shows the Startscreen and specifies the level attribut of the 
 * world. After that a timer is started such that the world attribut gameReady is set to true 
 * after 1s. This is done in order to make sure that the game has properly loaded before it is 
 * started by the user.
 */
function init() {
  canvas = new Canvas(document.getElementById('canvas'));
  world = new World(canvas, keyboard);
  showStartScreen();
  // Specify the world: 
  world.character = new Character();
  createLevel();
  // Wait 2s before the game is ready in order to properly load the game:
  setTimeout(() => {world.gameReady = true}, 2000);
  starting();
  restartGame();
} 


/**
 * Creates the start screen as a DrawableObject and then Checks 60 times per second if the game is ready to start.
 * If this is the case and the game was not started before, the start screen object is added to the canvas and the 
 * text 'Press SPACE to start...' is shown.
 */
function showStartScreen() {
  let startScreen = new DrawableObject();
  startScreen.x = 0;
  startScreen.y = 0;
  startScreen.width = canvas.width;
  startScreen.height = canvas.height;
  startScreen.loadImage('img/9.Intro _ Outro Image/Start Screen/Opción 1.png');
  setInterval(() => {
    if(world.gameStarted) return;
    world.canvas.drawObject(startScreen, 0);
    if(!world.gameReady) return;
    world.canvas.drawText('Press SPACE to start...', world.canvas.width/2, 440, 0);
  },1000/60);
}


/**
 * Checks 60 times per second if the user pressed SPACE after the game is ready and was
 * not started before. If this is the case the game is started.
 */
function starting(){
  setInterval(() => {
    if(world.gameReady && !world.gameStarted && keyboard.SPACE){
      world.startGame();
    }}, 1000/60);
}


/**
 * Checks 60 times per second if the user pressed SPACE after the game is over. If this is the case
 *  the game is restarted by calling init() and stopping the execution of the loop of the old world 
 * by setting the gameDelete property of the old world to true.
 */
function restartGame() {
  setInterval(() => {
    if((world.gameOver || world.gameWon) && keyboard.SPACE) {
      world.gameDelete = true;
      init();
    }
  }, 1000/60);
}


/**
 * This is the function which is called by clicking on the pause symbol. It freezes the 
 * game at the frame at which the symbol was clicked.
 */
function pauseGameButton() {
  if(!world.gameStarted || world.gameOver || world.gameWon) return;
  world.freeze = true;
  document.getElementById('pause-btn').style = 'display: none;';
  document.getElementById('restart-btn').style = 'display: unset';
}


/**
 * This is the function which is called by clicking on the play symbol. It continues the 
 * game at the frame at which the game was paused.
 */
function restartGameButton() {
  if(!world.gameStarted || world.gameOver || world.gameWon) return
  world.freeze = false;
  document.getElementById('pause-btn').style = 'display: unset;';
  document.getElementById('restart-btn').style = 'display: none';
}


/**
 * Check if the user presses a botton on the keyboard and update Keyboard object:
 */
window.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 32:
      keyboard.SPACE = true;
      break;
    case 37:
      keyboard.LEFT = true;
      break;
    case 38:
      keyboard.UP = true;
      break;
    case 39:
      keyboard.RIGHT = true;
      break;
    case 40:
      keyboard.DOWN = true;
      break;
    case 68:
      keyboard.D = true;
      break;
  }
});


/**
 * Check if the user stopped pressing a botton and update Keyboard object: 
 */ 
window.addEventListener('keyup', (event) => {
  switch (event.keyCode) {
    case 32:
      keyboard.SPACE = false;
      break;
    case 37:
      keyboard.LEFT = false;
      break;
    case 38:
      keyboard.UP = false;
      break;
    case 39:
      keyboard.RIGHT = false;
      break;
    case 40:
      keyboard.DOWN = false;
      break;
    case 68:
      keyboard.D = false;
      world.throwNextBottle = true;
      break;
  }
});


/**
 * Add funktionality for touch buttons needed to play the game with a smartphone: 
 */

// Start Game:
document.getElementById('canvas').addEventListener('touchstart', () => {
  keyboard.SPACE = true;
});
document.getElementById('canvas').addEventListener('touchend', () => {
  keyboard.SPACE = false;
});

// Move left:
document.getElementById('left-btn').addEventListener('touchstart', () => {
  keyboard.LEFT = true;
});
document.getElementById('left-btn').addEventListener('touchend', () => {
  keyboard.LEFT = false;
});

// Move right:
document.getElementById('right-btn').addEventListener('touchstart', () => {
  keyboard.RIGHT = true;
});
document.getElementById('right-btn').addEventListener('touchend', () => {
  keyboard.RIGHT = false;
});

// Jump:
document.getElementById('up-btn').addEventListener('touchstart', () => {
  keyboard.SPACE = true;
});
document.getElementById('up-btn').addEventListener('touchend', () => {
  keyboard.SPACE = false;
});

// Throw bottle:
document.getElementById('throw-btn').addEventListener('touchstart', () => {
  keyboard.D = true;
});
document.getElementById('throw-btn').addEventListener('touchend', () => {
  keyboard.D = false;
});



























