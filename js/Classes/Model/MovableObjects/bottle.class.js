class Bottle extends MovableObject {
  /* Attributes: */

  height = 60;
  width = 50;
  damage = 50;

  /**
   * When this Variable is true the bottle is splashed and the
   * splash animation should be shown.
   */
  isSplashed = false;

  splashedSoundPlayed = false;

  IMAGES_FLYING = [
    'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
    'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
    'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
    'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'
  ];

  IMAGES_SPLASHED = [
    'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
    'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
    'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
    'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
    'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
    'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png'
  ];

  SOUND_SPLASHED = new Audio('audio/bottle-crash.mp3');

  /* Methods: */

  /**
   * Creates a Bottle object at the given coordinates and throws it in positive
   * x-direction including gravity.
   * @param {number} x Start x-Position of bottle
   * @param {number} y Start y-position of bottle
   */
  constructor(x, y) {
    // Es gibt nur ein Bild für eine Flasche:
    super()
    this.loadImageCache(this.IMAGES_FLYING);
    this.loadImageCache(this.IMAGES_SPLASHED);
    this.x = x;
    this.y = y;
    this.attackBox = new Box(0, 0, this.width, this.height);

    this.bottleMovement();
    this.animateBottle();
  }


  bottleMovement() {
    this.applyGravity();
    this.throw();
    this.flying();
  }


  animateBottle() {
    this.animateFlying();
    this.animateSplash();
    this.updateBoxes();
    this.bottleSplashSound();
    this.setSoundProperties();
  }
  

  /**
   * Provides the necessary values for the speed of the bottle in x and y direction 
   * in order to throw the bottle.
   */
  throw() {
    this.speedY = 10;
    // The direction the character is facing should also be the direction in which
    // the character should throw the bottle:
    if (world.character.flipDirection) {
      this.speedX = -13;
      this.x -= 100; // Fix start point of bottle throw
    }
    else {
      this.speedX = 13;
    }
  }


  /**
   * Adds an element to the loopArray of the world in order to change the x position
   * of the bottle while it is flying through the air. This function also checks if
   * the bottle is splashed or hits the ground. The movement of the bottle stops after
   * it was splashed.
   */
  flying() {
    world.addToLoopArray(() => {
      if (this.isSplashed) return;
      this.moveRight();
      this.checkBottleSplashedOnGround();
    }, this.TimeMovement);
  }


  /**
   * Checks if a bottle falls on the ground. When this is the case the bottle should splash.
   */
  checkBottleSplashedOnGround() {
    if (this.y >= this.yPositionGround()) this.isSplashed = true;
  }


  bottleSplashSound() {
    world.addToLoopArray(() => {
      //this.SOUND_CHICKEN.pause();
      if (!this.isSplashed || this.splashedSoundPlayed) return;
      this.SOUND_SPLASHED.play();
      this.splashedSoundPlayed = true;
    }, this.TimeMovement);
  }


  setSoundProperties() {
    this.SOUND_SPLASHED.volume = 0.1;
  }


  updateBoxes() {
    world.addToLoopArray(() => {
      this.attackBox.addTo(this);
    }, this.TimeMovement);
  }


  animateFlying() {
    this.animate(this.IMAGES_FLYING, this.TimeAnimation, () => { 
      return !this.isSplashed;
    }
    );
  }

  /**
   * Adds the splash animation for a bottle with the property isSplashed which is set to true.
   * After the bottle is splashed the bottle object is completly removed from the game by setting 
   * its activ property to false (objects with property false are removed from the game in a method 
   * in the world class).  
   */
  animateSplash() {
    let myCurrentImage = 0;
    world.addToLoopArray(() => {
      if (!this.isSplashed) return;
      let i = myCurrentImage % this.IMAGES_SPLASHED.length;
      this.img = this.imageCache[this.IMAGES_SPLASHED[i]];
      myCurrentImage++;
      // After the splash animation is completed the objects should be removed from the game:
      if (myCurrentImage != this.IMAGES_SPLASHED.length) return;
      this.activ = false;
    }, this.TimeAnimation);
  }
}