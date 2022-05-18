/**
 * The Level Class contains the information about the enemies which the player faces and the enviroment objects
 * such like the backgroundObjects objects and Cloud objects.
 */
class Level {
  /* Attributs: */
  backgroundObjects = [];
  enemies;
  clouds;
  collectableObjects = [];
  numBgRepeated;
  levelEndX;

  /* Methods: */

  constructor(numBgRepeated) {
    this.levelEndX = 720 * (numBgRepeated - 1);
    for (let i = -numBgRepeated; i <= numBgRepeated; i++) {
      // JS erzeugt beim Modulo Rechnen von negativen Zahlen wieder negative Zahlen, daher musste hier die Betragsfunktion verwendet werden!
      // Außerdem musste von der width 1 abgezogen werden, da man sonst einen kleinen schwarzen Strich bekommt! Damit sich die Bilder immer
      // abwechseln wurde Modulo 2 in den Bildpaths gerechnet 
      this.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', (world.canvas.width - 1) * i, 0));
      this.backgroundObjects.push(new BackgroundObject(`img/5.Fondo/Capas/3.Fondo3/${1 + Math.abs(i % 2)}.png`, (world.canvas.width - 1) * i, 0.2));
      this.backgroundObjects.push(new BackgroundObject(`img/5.Fondo/Capas/2.Fondo2/${1 + Math.abs(i % 2)}.png`, (world.canvas.width - 1) * i, 0.5));
      this.backgroundObjects.push(new BackgroundObject(`img/5.Fondo/Capas/1.suelo-fondo1/${1 + Math.abs(i % 2)}.png`, (world.canvas.width - 1) * i));
    }
  }


  addEnemies(enemies) {
    this.enemies = enemies;
  }


  addClouds(clouds) {
    this.clouds = clouds;
  }


  /**
   * Adds small and big coins to the level object.
   * @param {number} numSmallCoin number of small coins that should be added to the Level object
   * @param {number} numBigCoin number of big coins that should be added to the Level object
   */
  addCoins(numSmallCoin, numBigCoin) {
    for (let i = 0; i < numSmallCoin; i++) {
      this.collectableObjects.push(new Coin('small'));
    }
    for (let i = 0; i < numBigCoin; i++) {
      this.collectableObjects.push(new Coin('big'));
    }
  }
  

  /**
   * Adds small and big hearths to the level object.
   * @param {number} numSmallHearth number of small hearths that should be added to the Level object
   * @param {number} numBigHearth number of big hearths that should be added to the Level object
   */
  addHearths(numSmallHearth, numBigHearth) {
    for (let i = 0; i < numSmallHearth; i++) {
      this.collectableObjects.push(new Hearth('small'));
    }
    for (let i = 0; i < numBigHearth; i++) {
      this.collectableObjects.push(new Hearth('big'));
    }
  }


  /**
   * Adds collectable bottles to the level object.
   * @param {number} numBottle number of collectable bottles that should be added to the Level object
   */
  addBottles(numBottle) {
    for (let i = 0; i < numBottle; i++) {
      this.collectableObjects.push(new BottleCollect());
    }
  }
}