/**
 * This class is used to generate hit- and attack-Box objects. An object gets damage when 
 * its hit-Box contains some part of an attack-Box of another object. Objects collide, when 
 * their hit-Box objects collide. 
 */
class Box {
  /* Attributes: */

  /**
   * Contains the canvas x coordinate relative to the object attached to it.
   */
  relX;

  /**
   * Contains the canvas y coordinate relative to the object attached to it.
   */
  relY;

  /**
   * Contains the absolute canvas x coordinate.
   */
  x;

  /**
   * Contains the absolute canvas y coordinate.
   */
  y;
  
  width;
  height;

  /* Methods: */

  constructor(relX, relY, width, height) {
    this.relX = relX;
    this.relY = relY;
    this.width = width;
    this.height = height;
  }


  /**
   * Adds a Box object to a drawableObject.
   * @param {DrawableObject} object object to which the Box gets attached.
   */
  addTo(object) {
    this.x = object.x + this.relX;
    this.y = object.y + this.relY;
  }


  /**
   * Checks if Box object on which this method is called and the Box object given as 
   * an argument collide. If they do the function returns true, else it returns false.
   * @param {Box} box 
   */
  isColliding(box) {
    return this.x + this.width >= box.x &&
      box.x + box.width >= this.x &&
      this.y + this.height >= box.y &&
      box.y + box.height >= this.y;
  }


  /**
   * Sets the attributs of the corresponding box in such a way, that it is not part of the
   * game (effectivly removing the Box object from the game). 
   */
  remove(){
    this.relY = -10000;
    this.width = 0;
    this.height = 0
  }
}