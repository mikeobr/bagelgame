var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });


var bgtile; 
var cursors;
var speed = 0;
var spaceKey;
function preload() { 
  game.load.image('sky', 'assets/road.jpg');
}

function create() {
  cursors = game.input.keyboard.createCursorKeys();
  bgtile = game.add.tileSprite(0,0, 800, 600, 'sky');
  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
 //bgtile = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('bgtile').height, 'bgtile');

}

function update() {
  accelerate();
  move();
}

function move() {
  bgtile.tilePosition.y += speed;
}

function accelerate() {
  if (cursors.up.isDown) {
    speed += .1;
  } else if (cursors.down.isDown) {
    speed -= .1
  } 

  if (spaceKey.isDown) {
    $('#game').addClass('shakeme');
    speed -= .8;
  }
  
  //Don't let speed get lower than 0, probably better way to handle this
  if (speed < 0) {
    speed = 0;
  }

  if (!speed || spaceKey.isUp) {
    $('#game').removeClass('shakeme');
  }
}