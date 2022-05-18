/**
 * 
 */
class StatusBar extends DrawableObject {
  /* Attributes: */

  /**
   * Value of Statusbar given as a natural number between 0 and 100.
   * @type {number}
   */
  percentage = 100;

  /**
   * Defines which type of Statusbar the object is: health, coins
   * or bottles. 
   * @type {string}
   */
  type;

  /**
   * Array containing the Paths of the images from the corresponding 
   * imagecache.
   * @type {Array}
   */
  imageCachePath;

  x = 30;
  width = 250;
  height = 60;

  IMAGES_HEALTH = [
    'img/7.Marcadores/Barra/Marcador vida/Naranja/0_ .png',
    'img/7.Marcadores/Barra/Marcador vida/Naranja/20_ .png',
    'img/7.Marcadores/Barra/Marcador vida/Naranja/40_ .png',
    'img/7.Marcadores/Barra/Marcador vida/Naranja/60_ .png',
    'img/7.Marcadores/Barra/Marcador vida/Naranja/80_ .png',
    'img/7.Marcadores/Barra/Marcador vida/Naranja/100_ .png'
  ];

  IMAGES_COINS = [
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/0_.png',
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/20_ .png',
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/40_.png',
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/60_.png',
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/80_.png',
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/100_.png'
  ];

  IMAGES_BOTTLES = [
    'img/7.Marcadores/Barra/Marcador_botella/Naranja/0_.png',
    'img/7.Marcadores/Barra/Marcador_botella/Naranja/20_.png',
    'img/7.Marcadores/Barra/Marcador_botella/Naranja/40_.png',
    'img/7.Marcadores/Barra/Marcador_botella/Naranja/60_.png',
    'img/7.Marcadores/Barra/Marcador_botella/Naranja/80_.png',
    'img/7.Marcadores/Barra/Marcador_botella/Naranja/100_.png'
  ];

  /* Methods: */

  constructor(type, percentage) {
    super();
    this.type = type;
    this.percentage = percentage;
    switch (type) {
      case 'health':
        this.imageCachePath = this.IMAGES_HEALTH;
        this.y = 0;
        break;
      case 'coins':
        this.imageCachePath = this.IMAGES_COINS;
        this.y = 50;
        break;
      case 'bottles':
        this.imageCachePath = this.IMAGES_BOTTLES;
        this.y = 100;
        break;
      default:
        throw new Error('Such a type of Statusbar is not defined.');
    }
    this.loadImageCache(this.imageCachePath);
    this.updateImage();

  }


  setPercentage(percentage) {
    this.percentage = percentage;
    this.updateImage();
  }


  updateImage() {
    // Math.round(number) rundet nach den normalen Rundungsregeln zur nächsten ganzen Zahl.
    // Math.ceil(number) rundet immer zur nächst höheren ganzen Zahl auf: 
    // 0.1 => 1, 1.2 => 2, 0 => 0
    // Math.floor(number) rundet immer zur nächst kleineren ganzen Zahl ab:
    // 0.1 => 0, 1.7 => 1, 0 => 0
    let num = Math.floor(this.percentage / 20);
    this.img = this.imageCache[this.imageCachePath[num]];
  }

}