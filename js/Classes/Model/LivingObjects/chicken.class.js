class Chicken extends LivingObject {
  /* Attributes: */
  width = 80;
  height = 80;
  health = 50;

  chickenKillSoundPlayed = false;

  IMAGES_WALKING = [
    'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
    'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
    'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
  ];

  IMAGES_DEAD = [
    'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png'
  ];

  SOUND_CHICKEN = new Audio('audio/chicken.mp3');
  SOUND_CHICKEN_KILL = new Audio('audio/chicken-kill.mp3');
 

  /* Methods: */

  constructor() {
    super();
    this.y = this.yPositionGround();
    this.x = 400 + Math.random() * 7500;
    this.speedX = 0.3 + Math.random();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImageCache(this.IMAGES_WALKING);
    this.loadImageCache(this.IMAGES_DEAD);

    this.hitBox = new Box(20, 0, this.width - 40, this.height - 40);
    this.attackBox = new Box(20, 40, this.width - 40, this.height - 60);

    this.chickenMovement();
    this.animateChicken();
  }


  chickenMovement() {
    this.chickenMoveLeft();
    this.updateBoxes();
    this.chickenSound();
    this.chickenKillSound();
    this.setSoundProperties();
  }



  animateChicken() {
    this.animateWalking();
    this.animateDeath();
  }



  chickenMoveLeft() {
    world.addToLoopArray(() => {
      if (this.isDead()) return;
      this.moveLeft();
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
      return !this.isDead();
    });
  }


  animateDeath() {
    this.animate(this.IMAGES_DEAD, this.TimeAnimation, () => {
      return this.isDead();
    });
  }














}