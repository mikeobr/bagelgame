class Car {
  constructor(trafficGroup, lane, sprite, speed) {
    this.direction = lane.DIRECTION; 
    this.sprite = trafficGroup.create(lane.X, lane.Y, sprite);
    if (this.direction === 1) {
      this.sprite.anchor.setTo(0.5, 0.5);
      this.sprite.angle += 180;
    }
    this.speed = lane.DIRECTION  * speed;
  }
}

var drive = {
  acceleration: 0.2,
  breakSpeed: 0.8,
  turnSpeed: 0,

  DIRECTION: {
    LEFT: -1,
    RIGHT: 1,
    UP: 1,
    DOWN: -1
  },

  LANE: {
    ONE: {
      X: 50,
      Y: 0,
      DIRECTION: 1
    },
    TWO: {
      X: 250,
      Y: 0,
      DIRECTION: 1
    },
    THREE: {
      X: 450,
      Y: -50,
      DIRECTION: -1
    },
    FOUR: {
      X: 600,
      Y: -50,
      DIRECTION: -1
    },
  },

  traffic: [],

  create: function(){
    this.cursors = game.input.keyboard.createCursorKeys();
    
    game.road = game.add.tileSprite(0,0, 800, 1200, 'road');
    this.speedText = game.add.text(16, 16, 'speed: 0', { fontSize: '32px', fill: '#000' });
    game.player = game.add.sprite(game.world.width - 200, game.world.height - 250, 'playercar');
    game.player.enableBody = true;
    game.physics.arcade.enable(game.player);
    game.player.body.collideWorldBounds
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.trafficGroup = game.add.group();
    this.trafficGroup.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 1, this.spawnCar, this);
  },

  update: function() {

    game.road.tilePosition.y += game.speed;
    game.physics.arcade.overlap(game.player, this.trafficGroup, this.explode, null, this);
    this.handleControls();
    this.moveTraffic();
  },

  explode: function(player, car) {
    car.kill()
    var boomPos = player.position;
    var boom = game.add.sprite(boomPos.x, boomPos.y, 'boom');
    boom.animations.add('explode');
    boom.animations.play('explode', 10, true);
    player.kill();
    game.speed = 0;
  },

  handleControls: function() {
    if (this.cursors.up.isDown) {
      this.speedChange(this.acceleration);
    } else if (this.cursors.down.isDown) {
      this.speedChange(-this.acceleration);
    } 

    if (this.cursors.left.isDown) {
      this.turn(-this.turnSpeed);
    }
    if (this.cursors.right.isDown) {
      this.turn(this.turnSpeed);
    }

    if (this.spaceKey.isDown) {
      $('#drive').addClass('shakeme');
      game.speed -= .8;
    }

    game.speed -= .01;
    if (game.speed < 0) {
      game.speed = 0;
    }

    if (!game.speed || this.spaceKey.isUp) {
      $('#drive').removeClass('shakeme');
    }

   this.speedText.text = 'Speed: ' + game.speed.toFixed(1);
  },

  speedChange: function(speedChange) {
    game.speed += speedChange;
    if (game.speed > 0) {
      this.turnSpeed = Math.min (35, .5 * game.speed);
    }
  },

  turn: function(sideMovement){
    game.player.position.x += sideMovement; 
  },

  spawnCar: function() {
    var color = this.getRandomCar();
    var lane = this.getLane();
    console.log("LANE");
    var car = new Car(this.trafficGroup, lane, color , 10);
    this.traffic.push(car);
  },

  getLane: function() {
    var ran = Math.random();
    if (ran < 0.25) {
      return this.LANE.ONE;
    } else if (ran < 0.50) {
      return this.LANE.TWO;
    } else if (ran < 0.75) {
      return this.LANE.THREE;
    } else {
      return this.LANE.FOUR;
    }
  },

  getRandomCar: function() {
    var ran = Math.random();;
    if (ran <0.25) {
      return 'whitecar';
    } else if (ran < 0.50) {
      return 'redcar';
    } else if (ran < 0.75) {
      return 'bluecar';
    } else {
      return 'blackcar';
    }
  },

  moveTraffic: function() {
    this.traffic.forEach(function(car, index, trafficArray) {
      car.sprite.position.y +=  (car.speed + game.speed);
       
      if(car.sprite.position.y > game.world.height) {
        car.sprite.destroy();
        trafficArray.splice(index, 1);
      }
    });
  }
}