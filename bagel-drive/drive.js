var drive = {
  acceleration: 0.2,
  breakSpeed: 0.8,
  turnSpeed: 1,

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

  score: 0,

  traffic: [],
  bagels: [],

  create: function(){
    this.cursors = game.input.keyboard.createCursorKeys();
    
    game.road = game.add.tileSprite(0,0, 800, 1200, 'road');
    this.speedText = game.add.text(16, 16, 'speed: 0', { fontSize: '32px', fill: '#000' });
    this.scoreText = game.add.text(600, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    game.player = game.add.sprite(game.world.width - 200, game.world.height - 250, 'playercar');
    game.player.enableBody = true;
    game.physics.arcade.enable(game.player);
    game.player.body.collideWorldBounds = true;
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.trafficGroup = game.add.group();
    this.trafficGroup.enableBody = true;

    this.bagelGroup = game.add.group();
    this.bagelGroup.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 1, this.spawnCar, this);
    game.time.events.loop(Phaser.Timer.SECOND * 3, this.addBagel, this);
  },

  update: function() {

    game.road.tilePosition.y += game.speed;
    game.physics.arcade.overlap(game.player, this.trafficGroup, this.explode, null, this);
    game.physics.arcade.overlap(game.player, this.bagelGroup, this.collect, null, this);
    this.handleControls();
    this.moveTraffic();
    this.moveBagels();
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

  collect: function(player, bagel) {
    bagel.kill();
    this.score += 1;
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
   this.scoreText.text = 'Bagel: ' + this.score; 
  },

  speedChange: function(speedChange) {
    game.speed += speedChange;
    if (game.speed > 0) {
      this.turnSpeed = Math.min (50, 1 * game.speed);
    }
  },

  turn: function(sideMovement){
    game.player.position.x += sideMovement; 
  },

  addBagel: function() {
    var bagelX = game.world.width * Math.random();
    var bagel = this.bagelGroup.create(bagelX, 0, 'bagel');
    bagel.scale.x = 2;
    bagel.scale.y = 2;
    this.bagels.push(bagel);
  },

  spawnCar: function() {
    var color = this.getRandomCar();
    var lane = this.getLane();
    var car = this.createCar(this.trafficGroup, lane, color , 10);
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
  },

  moveBagels: function() {
    this.bagels.forEach(function(bagel, index, bagelArray) {
      bagel.position.y += game.speed;
      if (bagel.position.y > game.world.height) {
        bagel.destroy();
        bagelArray.splice(index, 1);
      }
    });
  },

  createCar: function(trafficGroup, lane, sprite, speed) {
    var car = {};
    car.direction = lane.DIRECTION; 
    car.sprite = trafficGroup.create(lane.X, lane.Y, sprite);
    if (car.direction === 1) {
      car.sprite.anchor.setTo(0.5, 0.5);
      car.sprite.angle += 180;
    }
    car.speed = lane.DIRECTION  * speed;
    return car;
  }

}