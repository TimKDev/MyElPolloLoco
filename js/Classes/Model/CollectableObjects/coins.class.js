class Coin extends CollectableObject {
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
    this.loadImage('img/8.Coin/Moneda1.png');
    this.type = type;
    switch (this.type) {
      case 'small':
        this.constructSmallCoin();
        break;
      case 'big':
        this.constructBigCoin();
        break;
      default:
        throw new Error('Coin of this type is not definied.');
    }
    this.effect = () => {
      world.character.addCoin(this.value);
    }
  }

  constructSmallCoin() {
    this.width = 120;
    this.height = 120;
    this.value = 1;
    this.hitBox = new Box(45, 45, 30, 30);
    this.hitBox.addTo(this);
  }

  constructBigCoin() {
    this.width = 170;
    this.height = 170;
    this.value = 5;
    this.hitBox = new Box(62, 62, 45, 45);
    this.hitBox.addTo(this);
  }
}