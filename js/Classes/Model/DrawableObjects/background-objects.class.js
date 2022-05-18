class BackgroundObject extends DrawableObject {
  width = world.canvas.width;
  height = world.canvas.height;

  constructor(imgPath, x, distance = 1) {
    super().loadImage(imgPath);
    this.x = x;
    this.y = 0;
    this.distance = distance;
  }

}