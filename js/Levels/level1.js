function createLevel() {
  world.level = new Level(7);

  world.level.addEnemies([
    new Endboss(4000),
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
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
    new YellowChicken(),
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
  
  world.level.addCoins(30, 10);
  world.level.addHearths(10, 4);
  world.level.addBottles(25);
}



























