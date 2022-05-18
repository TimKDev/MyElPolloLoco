class Endboss extends LivingObject {

  /* Attributes: */

  width = 300;
  height = 300;

  speedX = 4;

  /**
   * Minimal time possible between two attacks in ms.
   * @type {number}
   */
  attackCooldown = 2000;
  damage = 5;
  health = 1000;

  alertAnimationCompleted = false;
  /**
   * Is set to true after the endboss was triggered by the character (coming to
   * close to the endboss or dealing damage to the endboss).
   * @type {boolean}
   */
  alert = false;
  running = false;
  attacking = false;
  
  runLeft = false;
  runRight = false;

  /**
   * Contains the x position of the canvas to which the endboss is moving at the moment. 
   * This position is updated when the character moves away from the endboss.
   * @type {number}
   */
  destinationX;

  /**
   * Contains frame Number of last attack (needed for cooldown).
   * @type {number}
   */
  frameLastAttack;

  IMAGES_ALERT = [
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png'
  ];

  IMAGES_RUNNING = [
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G3.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png'
  ];

  IMAGES_ATTACK = [
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png'
  ];

  IMAGES_HURT = [
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png'
  ];

  IMAGES_DEAD = [
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png'
  ];

  /* Methods: */

  constructor(x = 1200) {
    super();
    //this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImageCache(this.IMAGES_ALERT);
    this.loadImageCache(this.IMAGES_RUNNING);
    this.loadImageCache(this.IMAGES_ATTACK);
    this.loadImageCache(this.IMAGES_HURT);
    this.loadImageCache(this.IMAGES_DEAD);

    this.x = x;
    this.y = this.yPositionGround();
    this.hitBox = new Box(10, 50, this.width - 10, this.height - 150);
    this.attackBox = new Box(10, -300, 0, 0);
    //this.attackBox = new Box(10, 100, this.width - 140, this.height - 100);

    this.bossMovement();
    this.animateBoss();
  }

  /* Add animations to loopArray:*/

  bossMovement() {
    this.updateBoxes();
    this.attack();
    this.runLeftToX();
    this.runRightToX();
  }


  animateBoss() {
    this.animatePeacefulDefault();
    this.animateAngryDefault();
    this.animateAlert();
    this.animateRunning();
    this.animateAttack();
    this.animateHurt();
    this.animateDead();
  }

  /**
   * The attack-Box should only be active, when the attacking attribut is true.
   */
  updateBoxes() {
    world.addToLoopArray(() => {
      this.hitBox.addTo(this);
      this.attackBox.addTo(this);
      if (this.attacking) {
        // Activate attackbox:
        this.attackBox.relX = -50;
        this.attackBox.relY = 0;
        this.attackBox.width = this.width + 100;
        this.attackBox.height = this.height;
      }
      else {
        // Make attackbox unreachable (deactivating attackbox):
        this.attackBox.remove();
      }

    }, this.TimeMovement);
  }

  /**
   * This method is used to let the endboss run left to its current destinationX.
   */
  runLeftToX() {
    world.addToLoopArray(() => {
      if (!this.destinationX) return;
      if (!this.runLeft) return;
      this.flipDirection = false;
      this.running = true;
      if (this.destinationX + world.character.width >= this.x - 100) {
        this.running = false;
        this.runLeft = false;
        this.destinationX = undefined;
      }
      this.moveLeft();
    }, this.TimeMovement);
  }

  /**
   * This method is used to let the endboss run right to its current destinationX. Therefore 
   * the image of the endboss needs to be flipped.
   */
  runRightToX() {
    world.addToLoopArray(() => {
      if (!this.destinationX) return;
      if (!this.runRight) return;
      this.flipDirection = true;
      this.running = true;
      if (this.destinationX + world.character.width <= this.x + this.width + 100) {
        this.running = false;
        this.runRight = false;
        this.destinationX = undefined;
        //this.flipDirection = false;
      }
      this.moveRight();
    }, this.TimeMovement);
  }


  animateRunning() {
    this.animate(this.IMAGES_RUNNING, this.TimeAnimation, () => {
      return this.running && !this.isDead();
    });
  }


  animateAttack() {
    this.animate(this.IMAGES_ATTACK, this.TimeAnimation, () => {
      return this.attacking && !this.isDead();
    });
  }


  animateHurt() {
    this.animate(this.IMAGES_HURT, this.TimeAnimation, () => {
      return this.isHurt() && !this.isDead() && !this.attacking;
    });
  }


  animateDead() {
    this.animate(this.IMAGES_DEAD, this.TimeAnimation, () => {
      return this.isDead();
    }, true);
  }


  animatePeacefulDefault() {
    this.animate([this.IMAGES_ALERT[0]], this.TimeAnimation, () => {
      return !this.isDead() && !this.isHurt() && !this.alert && !this.running && !this.attacking && !this.alertAnimationCompleted;
    });
  }


  animateAngryDefault() {
    this.animate([this.IMAGES_ALERT[5]], this.TimeAnimation, () => {
      return !this.isDead() && !this.isHurt() && !this.alert && !this.running && !this.attacking && this.alertAnimationCompleted;
    });
  }


  /* Define boss behaviour:*/

  /**
   * Defines the destinationX property of the endboss und decides in which direction the endboss 
   * should move to get there.
   * @param {number} x Canvas x coordinate which should be used as the destinationX value.
   */
  runTo(x) {
    this.destinationX = x;
    if (x == this.x) this.destinationX = undefined;
    else if (x > this.x) this.runRight = true;
    else this.runLeft = true;
  }

  /**
   * Defines how the endboss should get aggressiv and changes its alert property to true. This is the case
   * when the character is less then 550 away from the endboss or when the endboss is damaged. This method
   * adds element to the loopArray of the world.
   */
  animateAlert() {
    let myCurrentImage = 0;
    let animationCompleted = false;

    world.addToLoopArray(() => {
      // Check if the return value of the conditionFuntion is true or the animation is completed:
      if ((Math.abs(world.character.x - this.x) > 550) && !this.isHurt() && !this.alert) return;
      this.alert = true;
      if (animationCompleted) return;
      let i = myCurrentImage % this.IMAGES_ALERT.length;
      this.img = this.imageCache[this.IMAGES_ALERT[i]];
      myCurrentImage++;
      // Checks if the animation was already completed:
      if (myCurrentImage >= this.IMAGES_ALERT.length) {
        animationCompleted = true;
        this.alertAnimationCompleted = true;
        this.alert = false;
      }
    }, this.TimeAnimation);
  }

  /**
   * Defined the attack behaviour of the endboss by adding a proper element to the loopArray of the 
   * world object. After the boss is alert it checks if the character is close enough to get hit by 
   * the attack of the endboss. If this is the case, the endboss attacks by setting the attacking 
   * property to true. If this is not the case the endboss is going to run to the position of the 
   * current position of the character. The duration of the attack is set in the attribut attackCooldown.
   */
  attack() {
    let currentlyInAnimation = false;
    world.addToLoopArray(() => {
      if (!this.alertAnimationCompleted || this.isDead() || currentlyInAnimation || this.running) return;
      if ((this.x - world.character.x <= 50) && this.x - world.character.x >= -300) {
        currentlyInAnimation = true;
        this.attacking = true;
        setTimeout(() => {
          this.attacking = false;
          currentlyInAnimation = false;
        }, this.attackCooldown); // Endboss attacks for 3000ms
      }
      else {
        this.runTo(world.character.x);
      }
    }, this.TimeMovement);
  }

}