var game = new Phaser.Game(800, 800, Phaser.AUTO, 'bageldrive', { preload: preload, create: create, update: update });


var bgtile; 

var playercar;
var cursors;
var speed = 0;
var spaceKey;
var cursors;
var speedText;
var whitecar;
var againstTraffic;

function preload() { 
  game.load.image('road', 'assets/longroad.jpg');
  game.load.image('playercar', 'assets/newcar.png');
  game.load.image('whitecar', 'assets/shucar3.png');
}

function create() {
  cursors = game.input.keyboard.createCursorKeys();
  bgtile = game.add.tileSprite(0,0, 800, 1000, 'road');
  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
 //bgtile = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('bgtile').height, 'bgtile');
  
  playercar = game.add.sprite(game.world.width - 200, game.world.height - 250, 'playercar');
  playercar.enableBody = true;
  whitecar = game.add.sprite(50, 50, 'whitecar');
  whitecar.anchor.setTo(0.5, 0.5);
  whitecar.angle += 180;
  speedText = game.add.text(16, 16, 'speed: 0', { fontSize: '32px', fill: '#000' });

  againstTraffic = game.add.group();
  againstTraffic.enableBody = true;
  for (var i = 0; i < 2; i++ ) {
    var car = againstTraffic.create(i * 200 + 50, -50, 'whitecar');
    car.anchor.setTo(0.5, 0.5);
    car.angle += 180;
    
  }

  //game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, createTraffic, this); 
  //againstTraffic.setAll('checkWorldBounds', true);
}

function createTraffic() {
  var car = againstTraffic.create(250, -50, 'whitecar');
  car.anchor.setTo(0.5, 0.5);
  car.angle += 180;
}

function update() {
  accelerate();
  move();

  againstTraffic.forEachAlive(checkCar);
}



function checkCar(car) {
  if (car.position.y > 300) {
    car.kill();
  }
}

function move() {
  bgtile.tilePosition.y += speed;
  whitecar.position.y += speed + 10;
  againstTraffic.setAll('position.y', 15 + 10 * speed);
}

function accelerate() {
  if (cursors.up.isDown) {
    speed += .1;
  } else if (cursors.down.isDown) {
    speed -= .1
  } if (cursors.left.isDown) {
    if (speed > 0) {
      movement = Math.min (30, .5 * speed);
      playercar.position.x -= movement;
    }
  }

  if (cursors.right.isDown) {
    if (speed > 0) {
      movement = Math.min (30, .5 * speed);
      playercar.position.x += movement;
    }
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

  speedText.text = 'Speed: ' + speed.toFixed(1);
}