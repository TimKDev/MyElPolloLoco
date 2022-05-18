class Cloud extends MovableObject {
  /* Attributes: */

  y = 0;
  width = 500;
  height = 300;
  speedX = 0.1;

  /* Methods: */

  constructor() {
    super();
    // Decide randomly which image is used for the bottle:
    if(Math.random() < 0.5){
      this.loadImage('img/5.Fondo/Capas/4.nubes/1.png');
    }
    else {
      this.loadImage('img/5.Fondo/Capas/4.nubes/2.png');
    }
    this.x = 100 + Math.random() * 4000;
    world.addToLoopArray(() => { this.moveLeft(); }, this.TimeMovement);
  }
}