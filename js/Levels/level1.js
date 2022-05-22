function createLevel() {
  world.level = new Level(5);

  world.level.addEnemies([
    new Endboss(3000),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken()
  ]);

  world.level.addClouds([
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud()
  ]);
  
  world.level.addCoins(20, 5);
  world.level.addHearths(10, 2);
  world.level.addBottles(25);
}



























