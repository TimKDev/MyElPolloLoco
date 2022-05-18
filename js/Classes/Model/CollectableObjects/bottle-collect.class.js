/**
 * The BottleCollect class is used to create the bottle objects, that the user can collect. They 
 * are completly independent from the Bottle class whose objects are the bottles which the user can 
 * throw.
 */
class BottleCollect extends CollectableObject {
  /* Attributes: */

  width = 60;
  height = 60;

  /* Methods: */

  constructor() {
    super();
    this.x = 100 + Math.random() * (world.level.levelEndX - 600);
    this.y = this.yPositionGround();
    // Decide randomly which image is used for the bottle:
    if(Math.random() < 0.5){
      this.loadImage('img/6.botella/2.Botella_enterrada2.png');
    }
    else {
      this.loadImage('img/6.botella/2.Botella_enterrada1.png');
    }
    this.effect = () => {
      world.character.addBottle();
    }
    this.hitBox = new Box(20, 0, this.width - 40, this.height);
    this.hitBox.addTo(this);
  }

}