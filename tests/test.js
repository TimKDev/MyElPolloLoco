
/*
 * Testbeispiel zur Erklärung meiner Vermeidung von setIntervals():
 */


class World {
  loopArray = [];
  frame = 0;
  framesPerSecond = 100; // Muss noch irgendwie berechnet werden
  milliSecondPerFrame = 10 // Folgt aus framesPerSecond
  character = {};


  constructor() {
    this.loop();
    // Alternative Lösung mit setInterval():
    // setInterval(() => {this.loop();}, this.framesPerSecond); 
  }


  loop() {
    this.update();
    console.log('Character Position:', this.character.x);
    requestAnimationFrame(() => { this.loop(); });
    this.frame++;
  }

  update() {
    this.loopArray.forEach((element) => {
      if (this.frame % element[1] === 0) element[0](); // Magic (firstclass functions and "this" in arrow functions) 
    });
  }

}


class Character {
  x = 100;
  constructor() {
    world.loopArray.push([() => {
      this.moveX()// 
    }, 1000 / world.milliSecondPerFrame]); // 1000 sind die Millisekunden für den Loop der Funktion!

    world.loopArray.push([() => {
      console.log('Hallo');
    }, 2000 / world.milliSecondPerFrame]);

    world.loopArray.push([() => {
      console.log('Tschüss');
    }, 1000 / world.milliSecondPerFrame]);
  }

  moveX() {
    this.x += 10;
  }
}


let world = new World(); // Zunächst muss ein leeres World Objekt definiert werden
world.character = new Character(); // Erst nachdem die leere World initialisert wurde, werden jetzt andere Elemente 
// wie Charactere hinzugefügt












