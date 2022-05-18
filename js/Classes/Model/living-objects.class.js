class LivingObject extends MovableObject {
  /* Attributes: */

  /**
   * Damage that the object can tank.
   * @type {number}
   */
  health = 100;

  // /**
  //  * Saves damage amount of the object, such that it can be restored, if the object 
  //  * temporaly gets 0 damage, because it was hurt. Game logic: Dead or hurt objects 
  //  * dont deal damage.
  //  * @type {number}
  //  */
  // saveDamage = 10;

  /**
   * Contains the frame number at which the object took damage for the last time.
   * @type {number}
   */
  frameLastDamage;


  /* Methods: */

  isAttackBy(object) {
    if (object instanceof LivingObject) {
      // Objects that are hurt or dead cannot do damage:
      if (object.isDead()) return false;
    }
    if (object instanceof Character) {
      if (object.isHurt()) return false;
    }
    if (this instanceof Endboss || object instanceof Endboss || object instanceof Chicken || object instanceof YellowChicken){
      if (object.dealtDamage()) return false;
    }
    return this.hitBox.isColliding(object.attackBox);
  }


  getDamage(amount) {
    this.health -= amount;
    if (this.health < 0) { this.health = 0; return; }
    this.frameLastDamage = world.frame;
  }

  /**
   * Checks if the object took damage in the last 0.7 seconds. If this is not the case the 
   * object is hurt and cannot take anymore damage.
   */
  isHurt() {
    if (!this.frameLastDamage) return;
    if (world.frame - this.frameLastDamage < world.framesPerSecond*0.7) return true;
    return false;
  }


  /**
   * Checks if the object is dead and removes the hit and attack Box from dead objects.
   */
  isDead() {
    if (this.health > 0) return false;
    this.hitBox.remove();
    this.attackBox.remove();
    return true;
  }
}