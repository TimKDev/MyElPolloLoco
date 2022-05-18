/**
 * The Canvas class is responsable for the graphical representation of the game by 
 * adding the objects from the model classes to the canvas DOM element.
 */
class Canvas {
  /* Attributes: */

  /** 
   * Contains the canvas DOM Element.
   * @type {Document}
   */
  canvasDOM;

  width;
  height;
  ctx;

  /** 
   * y-position of the ground in canvas coordinates.
   * @type {number}
   */
  yPositionGround;

  /* Methods:*/

  constructor(canvasDOM) {
    this.canvasDOM = canvasDOM;
    this.width = canvasDOM.width;
    this.height = canvasDOM.height;
    this.ctx = this.canvasDOM.getContext('2d');
    this.yPositionGround = this.height - 45; // Muss noch korrekt angepasst werden ########################
  }


  /**
   * Remove all Objects from Canvas.
   */
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }


  /**
   * Creates an DrawableObject relativ to the x-position relX in canvas coordinates.
   * @param {DrawableObject} object 
   * @param {number} relX 
   */
  drawObject(object, relX) {
    if (!object.img) return;
    this.ctx.translate(relX, 0);
    if (object.flipDirection) {
      this.flipImage(object);
    }
    this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    if (object.flipDirection) {
      this.flipImageBack(object);
    }
    this.ctx.translate(-relX, 0);
  }


  /**
   * Draws Box objects. Used for debugging only.
   * @param {Box} box Hitbox of object
   * @param {number} relX 
   */
  drawBox(box, relX) {
    if (!box) return;
    this.ctx.translate(relX, 0);
    this.ctx.beginPath();
    this.ctx.rect(box.x, box.y, box.width, box.height);
    this.ctx.stroke();
    this.ctx.translate(-relX, 0);
  }


  /**
   * Draws a text field with text into the canvas.
   * @param {String} string Contains the text, which should 
   * be added to the canvas
   * @param {number} x Canvas x coordinate of the text field
   * @param {number} y Canvas y coordinate of the text field
   * @param {number} relX 
   */
  drawText(string, x, y, relX) {
    this.ctx.translate(relX, 0);
    this.ctx.font = "30px Comic Sans MS";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(string, x, y); 
    this.ctx.translate(-relX, 0);
  }


  /**
   * 
   * @param {Array} array Array of DrawableObject Objects
   * @param {number} relX Canvas x Position relative to which the objects are painted.
   */
  drawObjectArray(array, relX) {
    if (!array) return;
    array.forEach(element => {
      this.drawObject(element, relX*element.distance);
    });
  }


  /**
   * Transforms the canvas in order to mirror the image of a DrawableObject. This function 
   * needs to be called before the object is painted. 
   * @param {DrawableObject} object 
   */
  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * (-1);
  }


  /**
   * Transforms the canvas back to its noraml state after it was changed in order to mirror an 
   * image of the DrawableObject given as a parameter. This function needs to be called after 
   * the object was painted. 
   * @param {DrawableObject} object 
   */
  flipImageBack(object) {
    object.x = object.x * (-1);
    this.ctx.restore();
  }
}