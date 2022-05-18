class YellowChicken extends LivingObject {
  /* Attributes: */
  width = 80;
  height = 80;

  health = 50;

  jumping = false;

  IMAGES_WALKING = [
    'img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png',
    'img/3.Secuencias_Enemy_básico/Versión_pollito/2.Centro.png',
    'img/3.Secuencias_Enemy_básico/Versión_pollito/3.Paso_izquierdo.png'
  ];

  IMAGES_DEAD = [
    'img/3.Secuencias_Enemy_básico/Versión_pollito/4.Muerte.png'
  ];

  SOUND_CHICKEN = new Audio('audio/chicken.mp3');

  SOUND_CHICKEN_KILL = new Audio('audio/chicken-kill.mp3');


  /* Methods: */

  constructor() {
    super();
    this.y = this.yPositionGround();
    this.x = 400 + Math.random() * 7500;
    this.speedX = 0.7 + Math.random()*2;
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImageCache(this.IMAGES_WALKING);
    this.loadImageCache(this.IMAGES_DEAD);

    this.hitBox = new Box(20, 0, this.width - 40, this.height - 40);
    this.attackBox = new Box(20, 40, this.width - 40, this.height - 60);

    this.chickenMovement();
    this.animateChicken();
  }


  chickenMovement() {
    this.applyGravity();
    this.chickenMoveLeft();
    this.chickenJump();
    this.updateBoxes();
    this.chickenRandomBehaviour();
    this.chickenSound();
    this.chickenKillSound();
    this.setSoundProperties();
  }



  animateChicken() {
    this.animateWalking();
    this.animateJumping();
    this.animateDeath();
  }

  /**
   * Sets the value of jumping randomly to true or false. When the value is true
   * the chicken will jump.
   */
  chickenRandomBehaviour() {
    world.addToLoopArray(() => {
      this.jumping = false;
      let random = Math.floor(Math.random()*5);
      if(random == 1) this.jumping = true;
    }, 500);
  }


  chickenMoveLeft() {
    world.addToLoopArray(() => {
      if (this.isDead() || this.isAboveGround()) return;
      this.moveLeft();
    }, this.TimeMovement);
  }


  chickenJump() {
    world.addToLoopArray(() => {
      if (this.isAboveGround() || !this.jumping || this.isDead()) return;
      this.jump();
    }, this.TimeMovement);
  }


  chickenSound() {
    world.addToLoopArray(() => {
      this.SOUND_CHICKEN.pause();
      if (world.gameOver || world.gameWon) return;
      if (this.isDead() || Math.abs(world.character.x - this.x) > 1000) return;
      this.SOUND_CHICKEN.play();
    }, 1000);
  }


  chickenKillSound() {
    world.addToLoopArray(() => {
      //this.SOUND_CHICKEN.pause();
      if (!this.isDead() || this.chickenKillSoundPlayed) return;
      this.SOUND_CHICKEN_KILL.play();
      this.chickenKillSoundPlayed = true;
    }, this.TimeMovement);
  }


  setSoundProperties() {
    this.SOUND_CHICKEN.volume = 0.0;
    this.SOUND_CHICKEN_KILL.volume = 0.05;
  }


  updateBoxes() {
    world.addToLoopArray(() => {
      this.hitBox.addTo(this);
      this.attackBox.addTo(this);
    }, this.TimeMovement);
  }


  animateWalking() {
    this.animate(this.IMAGES_WALKING, this.TimeAnimation, () => {
      return !this.isDead() && !this.isAboveGround();
    });
  }


  animateJumping() {
    this.animate([this.IMAGES_WALKING[1]], this.TimeAnimation, () => {
      return !this.isDead() && this.isAboveGround();
    });
  }


  animateDeath() {
    this.animate(this.IMAGES_DEAD, this.TimeAnimation, () => {
      return this.isDead();
    });
  }







}