class Hearth extends CollectableObject {
  /* Attributes: */

  /**
   * Defines the typ of the Coin object: small or big.
   * @type {string}
   */
  type;

  /**
   * Defines the value of the Coin object.
   * @type {number} 
   */
  value;

  /* Methods: */

  constructor(type) {
    super();
    this.x = 100 + Math.random() * (world.level.levelEndX - 600);
    this.y = this.yPositionGround() - Math.random() * 150;
    this.loadImage('img/7.Marcadores/Icono/Vidas.png');
    this.type = type;
    switch (this.type) {
      case 'small':
        this.constructSmallHearth();
        break;
      case 'big':
        this.constructBigHearth();
        break;
      default:
        throw new Error('Coin of this type is not definied.');
    }
    this.effect = () => {
      world.character.addHealth(this.value);
    }
  }

  constructSmallHearth() {
    this.width = 60;
    this.height = 60;
    this.value = 20;
    this.hitBox = new Box(12, 20, 37, 30);
    this.hitBox.addTo(this);
  }

  constructBigHearth() {
    this.width = 80;
    this.height = 80;
    this.value = 50;
    this.hitBox = new Box(15, 25, 47, 42);
    this.hitBox.addTo(this);
  }
}


















