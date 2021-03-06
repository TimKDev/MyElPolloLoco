/**
 * Contains additional information and methods for objects, which can be moved around.
 */
class MovableObject extends DrawableObject {
  /* Attributes: */
  
  speedX = 0;
  speedY = 0;
  accelerationY = 0.5;
  TimeMovement = 1000 / 60;
  TimeAnimation = 100;

  /**
   * Damage that the object deals to other objects.
   * @type {number}
   */
  damage = 5;

  /**
   * Contains the last frame number, when the object dealt damage to another object.
   * @type {number}
   */
  frameLastDamageDeal;

  /**
   * Attack Hit-box of the object.
   * @type {Box}
   */
  attackBox;

  /* Methods: */

  /**
   * Adds an array to the loopArray of the global World object to generate an animation for the 
   * object on which this method is called, using the image paths provided as an argument. Optionally 
   * a condition for playing the animation can be provided. Make sure to load the images in the image 
   * Cache of the object before using this function!
   * @param {Array} images Array of URL's for images given as strings
   * @param {number} timeInterval Time interval for playing the animation    
   * @param {function} conditionFunction Function containing a condition for starting the animation and 
   * returning a boolian value, default value is a function always returning true
   * @param {boolean} playAnimationOnce When true the animation will only be played once, defealt value is
   * false.
   */
  animate(images, timeInterval, conditionFunction = () => { return true }, playAnimationOnce = false) {
    // The myCurrentImage gives the image currently used for the object. It is bound to the anomynous 
    // function expression given to the addToLoopArray method by the closure principle.
    let myCurrentImage = 0;
    let animationCompleted = false;
    world.addToLoopArray(() => {
      // Check if the return value of the conditionFuntion is true or the animation is completed:
      if (!conditionFunction() || animationCompleted) {
        // If the condition is not fullfilled, the animation should reset and start again with the 
        // first picture.
        myCurrentImage = 0;
        return;
      }
      let i = myCurrentImage % images.length;
      this.img = this.imageCache[images[i]];
      myCurrentImage++;
      // Checks if the animation was already completed:
      if(playAnimationOnce){
        if(myCurrentImage >= images.length) animationCompleted = true;
      }
    }, timeInterval);
  }


  /**
   * Adds an gravitational effect to an objects movement.
   */
  applyGravity() {
    world.addToLoopArray(() => {
      if (this instanceof Bottle) {
        if (this.isSplashed) return;
      }
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelerationY;
      }
    }, this.TimeMovement);
  }


  /**
   * Checks if the object is above the ground and returns a boolian. Objects of the Bootle class
   * always return true, because they should fall through the ground.
   */
  isAboveGround() {
    if (this instanceof Bottle) return true;
    return this.y + this.height < world.canvas.yPositionGround;
  }


  moveLeft() {
    this.x -= this.speedX;
  }


  moveRight() {
    this.x += this.speedX;
  }


  /**
   * Provides the object with an initial speed in the y direction to jump.
   */
  jump() {
    this.speedY = 13;
  }


  /**
   * Checks if the object dealt damage to another object in the last 100ms. If this is not the case the 
   * object is not allowed to deal anymore damage!
   */
  dealtDamage() {
    if (!this.frameLastDamageDeal) return;
    if (world.frame - this.frameLastDamageDeal < world.framesPerSecond / 10) return true;
    return false;
  }
}