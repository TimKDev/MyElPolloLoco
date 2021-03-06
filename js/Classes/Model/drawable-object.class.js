class DrawableObject {
  /* Attributes: */
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  /**
   * Defines the distance from the character in the z direction. 1 means at the distance of the character
   * and 0 means so far away from the character, that it doesnt move at all.
   * @type {number}
   */
  distance = 1;

  /**
   * Contains the hit-Box object of the object.
   * @type {Box}
   */
  hitBox;

  /**
   * Determines if the object is currently in the game.
   * @type {boolean}
   */
  activ = true;

  /**
   * Image that represents the object in the canvas.
   * @type {Image}
   */
  img;

  /**
   * JSON containing Image objects, which are used to represent the object in the canvas.
   * @type {JSON}
   */
  imageCache = {};

  /**
   * flipDirection tells if the img of the object should be mirrored in the canvas representation.
   * @type {boolean}
   */
  flipDirection = false;

  /* Methods: */

  /**
   * Generates an Image object using the image save at the URL given as a parameter and sets the
   * img attribute of the DrawableObject to the generated Image object.
   * @param {string} path URL to image
   */
  loadImage(path) {
    this.img = new Image(); // Image ist der Konstruktor einer vordefinierten Klasse in JS, die
    // DOM Elemente mit dem Tag <img> generiert!
    // "this" referenziert immer auf das Objekt auf dem die Methode aufgerufen wird.
    this.img.src = path;
  }


  /**
   * Takes an Array of strings containing URL's of images to create Image objects and to save them 
   * in the imageCache attribute of the object.
   * @param {Array} array Array containing URL of images as strings
   */
  loadImageCache(array) {
    array.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }


  /**
   * @returns y-position of canvas such that the object is on ground level.
   */
  yPositionGround() {
    return world.canvas.yPositionGround - this.height; // images are placed with 
    // respect to their upper left corner!
  }

}