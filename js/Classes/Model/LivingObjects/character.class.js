class Character extends LivingObject {
  /* Attributes: */
  x = 120;
  width = 120;
  height = 220;
  speedX = 3;
  coins = 0;
  bottles = 0;
  damage = 50;

  isSleeping = false;

  hurtSoundAlreadyPlayed = false;

  IMAGES_STANDING = [
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-2.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-3.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-4.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-5.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-6.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-7.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-8.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-9.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-10.png'
  ];

  IMAGES_SLEEPING = [
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-11.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-12.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-13.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-14.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-15.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-16.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-17.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-18.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-19.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-20.png'
  ];

  IMAGES_WALKING = [
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
  ];

  IMAGES_JUMPING = [
    'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-31.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-32.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png'
  ];

  IMAGES_HURT = [
    'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png'
  ];

  IMAGES_DEAD = [
    'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png'
  ];

  WALKING_SOUND = new Audio('audio/walking.mp3');
  JUMPING_SOUND = new Audio('audio/jump.mp3');
  HURT_SOUND = new Audio('audio/hurt.mp3');

  /* Methods: */

  constructor() {
    super();
    this.y = this.yPositionGround();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImageCache(this.IMAGES_STANDING);
    this.loadImageCache(this.IMAGES_SLEEPING);
    this.loadImageCache(this.IMAGES_WALKING);
    this.loadImageCache(this.IMAGES_JUMPING);
    this.loadImageCache(this.IMAGES_HURT);
    this.loadImageCache(this.IMAGES_DEAD);

    this.hitBox = new Box(20, 90, this.width - 40, this.height - 100);
    this.attackBox = new Box(30, 180, this.width - 60, this.height - 170);

    this.movementCharacter();
    this.animateCharacter();
  }


  addCoin(value) {
    this.coins += value;
    if (this.coins > 100) this.coins = 100;
  }


  addBottle() {
    this.bottles++;
    if (this.bottles > 100) this.bottles = 100;
  }


  addHealth(value) {
    this.health += value;
    if (this.health > 100) this.health = 100;
  }


  /**
   * Combines all methods needed to add the correct movement conditions of the
   * character to the loopArray of the global world object.
   */
  movementCharacter() {
    this.applyGravity();
    this.characterMoveLeft();
    this.characterMoveRight();
    this.characterJump();
    this.characterWalkingSound();
    this.characterJumpingSound();
    this.characterHurtSound();
    this.setSoundProperties();
    this.updateCameraXPosition();
    this.updateBoxes();
  }

  /**
   * Combines all methods needed to add the animations of the character 
   * to the loopArray of the global world object.
   */
  animateCharacter() {
    this.animateStanding();
    this.animateSleeping();
    this.animateWalking();
    this.animateJumping();
    this.animateHurt();
    this.animateDeath();
  }


  /**
   * Adds an object to the loopArray of the global world object, which checks
   * at each frame, if the user presses the LEFT key and if the Character object
   * is not running outside the level area. When both conditions are true the 
   * character moves left.
   */
  characterMoveLeft() {
    world.addToLoopArray(() => {
      if (world.keyboard.LEFT == false) return;
      if (this.x < 120) return;
      this.flipDirection = true;
      this.isSleeping = false;
      this.moveLeft();
    }, this.TimeMovement);
  }


  /**
   * Adds an object to the loopArray of the global world object, which checks
   * at each frame, if the user presses the RIGHT key and if the Character object
   * is not running outside the level area. When both conditions are true the 
   * character moves right.
   */
  characterMoveRight() {
    world.addToLoopArray(() => {
      if (world.keyboard.RIGHT == false) return;
      if (this.x > world.level.levelEndX) return;
      this.flipDirection = false;
      this.isSleeping = false;
      this.moveRight();
    }, this.TimeMovement);
  }

  /**
   * Adds an object to the loopArray to generate sounds while the character is 
   * walking.
   */
  characterWalkingSound() {
    world.addToLoopArray(() => {
      this.WALKING_SOUND.pause();
      if (world.gameOver || world.gameWon) return;
      if (world.keyboard.LEFT == false && world.keyboard.RIGHT == false ) return;
      this.WALKING_SOUND.play();
    }, this.TimeMovement);
  }


  characterJumpingSound() {
    world.addToLoopArray(() => {
      if (world.keyboard.SPACE == false) return;
      this.JUMPING_SOUND.play();
    }, this.TimeMovement);
  }


  characterHurtSound() {
    world.addToLoopArray(() => {
      if (!this.isHurt()){
        this.hurtSoundAlreadyPlayed = false;
      }
      if (this.isHurt() && !this.hurtSoundAlreadyPlayed){
        this.HURT_SOUND.play();
        this.hurtSoundAlreadyPlayed = true;
      }
    }, this.TimeMovement);
  }


  setSoundProperties() {
    this.WALKING_SOUND.volume = 0.05;
    this.JUMPING_SOUND.volume = 0.1;
    this.HURT_SOUND.volume = 0.2;
  }


  /**
   * Adds an object to the loopArray of the global world object, which checks
   * at each frame, if the user presses the LEFT key and if the Character object
   * is not running outside the level area. When both conditions are true the 
   * character moves left.
   */
  characterJump() {
    world.addToLoopArray(() => {
      if (world.keyboard.SPACE == false) return;
      if (this.isAboveGround()) return;
      this.isSleeping = false;
      this.jump();
    }, this.TimeMovement);
  }


  /**
   * Adds an object to the loopArray of the global world object, which updates
   * at each frame the cameraX position to the position of the character.
   */
  updateCameraXPosition() {
    world.addToLoopArray(() => {
      world.cameraX = -this.x + this.width;
    }, this.TimeMovement);
  }


  /**
   * Attack and Hit-Box need to me moved together with the character, when the character 
   * is moved. This functions adds an element to the loopArray which does this.
   */
  updateBoxes() {
    world.addToLoopArray(() => {
      this.hitBox.addTo(this);
      this.attackBox.addTo(this);
    }, this.TimeMovement);
  }

  /**
   * Generates the standing animation of the character in such a way, that the sleeping
   * animation automatically starts after the standing animation was completed three times.
   */
  animateStanding() {
    // Use again Closure with myCurrentImage:
    let myCurrentImage = 0;
    world.addToLoopArray(() => {
      if (world.keyboard.LEFT || world.keyboard.RIGHT || this.isAboveGround() || this.isSleeping) {
        myCurrentImage = 0;
        return;
      }
      let i = myCurrentImage % this.IMAGES_STANDING.length;
      this.img = this.imageCache[this.IMAGES_STANDING[i]];
      myCurrentImage++;
      if (myCurrentImage % (3 * this.IMAGES_STANDING.length) === 0) {
        this.isSleeping = true;
      }
    }, this.TimeAnimation);
  }


  animateSleeping() {
    this.animate(this.IMAGES_SLEEPING, this.TimeAnimation, () => {
      return this.isSleeping && !world.keyboard.LEFT && !world.keyboard.RIGHT && !this.isAboveGround();
    }
    );
  }


  animateWalking() {
    this.animate(this.IMAGES_WALKING, this.TimeAnimation, () => {
      return (world.keyboard.LEFT || world.keyboard.RIGHT) && !this.isAboveGround();
    }
    );
  }


  animateJumping() {
    this.animate(this.IMAGES_JUMPING, this.TimeAnimation - 30, () => { // Time finetuning needed ###################################
      return this.isAboveGround() && !this.isDead();
    }
    );
  }


  animateHurt() {
    this.animate(this.IMAGES_HURT, this.TimeAnimation, () => {
      return this.isHurt() && !this.isDead();
    }
    );
  }


  animateDeath() {
    this.animate(this.IMAGES_DEAD, this.TimeAnimation, () => {
      return this.isDead();
    }
    );
  }


}