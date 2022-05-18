class CollectableObject extends DrawableObject {
  /* Attributes: */

  /**
   * Function which is called when an object collects this CollectableObject 
   * object and passes the object collecting it as its first argument.
   * @type {Function}
   */
  effect;

  /* Methods: */

  /**
   * Applys the effect of the object which was collected by calling its effect property.
   * After that the collected object is removed from the game by setting its activ property 
   * to false.
   */
  collectByCharacter() {
    (this.effect)();
    this.activ = false;
  }
}