var playState = {

  backgroundMoveRate: 5,
  playerSpeed: 150,
  switchTime: 0,
  switchRate: 200,
  shootTime: 0,
  shootRate: 100,
  bulletSpeed: -200,
  nextBaddieShootTime: 0,
  baddieShootRate: 1000,
  nextBaddieArriveTime: 0,
  baddieArriveRate: 5000,

  create: function() {
    this.score = 0;
    game.world.alpha = 1;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.background = game.add.tileSprite(0, 0, 800, 600, 'sky');
    this.scoreText = game.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#ffffff' });
    this.scoreText.font = 'Orbitron';

    this.player = game.add.sprite(32, game.world.height - 100, 'player');
    game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.vecnaPeople = this.setupPeople('mike', 10, 60);
    this.bagels = this.setupBulletOptions('bagel', 21);
    this.weapoons = this.setupBulletOptions('weapoon', 21);
    this.setupCurrentBullets(this.bagels);

    this.baddies = this.setupPeople('baddie', 10, 60);
    this.baddieWeapoons = this.setupBulletOptions('baddieWeapoon', 10);
  },

  setupBulletOptions: function(aliasKey, num) {
    var objects = game.add.group();
    objects.enableBody = true;
    objects.createMultiple(num, aliasKey);
    objects.setAll('outOfBoundsKill', true);
    objects.setAll('checkWorldBounds', true);
    objects.setAll('exists', false);
    return objects;
  },

  setupCurrentBullets: function(current) {
    this.bullets = current;
    if (this.bulletExample) {
      this.bulletExample.kill();
    }
    this.bulletExample = this.bullets.getFirstExists(false);
    this.bulletExample.anchor.setTo(0.5, 0.5);
    this.bulletExample.reset(game.world.width - 50, 30);
  },

  setupPeople: function(aliasKey, num, velocity) {
    var people = game.add.group();
    people.enableBody = true;
    for (var i = 0; i < num; i++) {
      var person = people.create(game.rnd.between(50, game.world.width - 50), game.rnd.between(50, game.world.height / 2 - 50), aliasKey);
      person.body.bounce.x = 1;
      person.body.velocity.x = game.rnd.between(-velocity, velocity);
      person.body.collideWorldBounds = true;
    }
    return people;
  },

  update: function() {
    this.background.tilePosition.y += this.backgroundMoveRate;
    this.player.body.velocity.x = 0;

    game.physics.arcade.collide(this.baddies, this.vecnaPeople);
    game.physics.arcade.collide(this.baddies, this.baddies);
    game.physics.arcade.collide(this.vecnaPeople, this.vecnaPeople);

    game.physics.arcade.overlap(this.bagels, this.baddies, this.feedBaddie, null, this);
    game.physics.arcade.overlap(this.weapoons, this.baddies, this.killTarget, null, this);
    game.physics.arcade.overlap(this.bagels, this.vecnaPeople, this.feedVecnaGuy, null, this);
    game.physics.arcade.overlap(this.weapoons, this.vecnaPeople, this.killTarget, null, this);
    game.physics.arcade.overlap(this.baddieWeapoons, this.player, this.playerDied, null, this);

    var cursors = game.input.keyboard.createCursorKeys();
    var shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var switchButton = game.input.keyboard.addKey(Phaser.Keyboard.TAB);

    if (shootButton.isDown) {
      this.shooting();
    } else if (switchButton.isDown) {
      this.switching();
    }
    if(cursors.left.isDown) {
      this.player.body.velocity.x = -this.playerSpeed;
    } else if (cursors.right.isDown) {
      this.player.body.velocity.x = this.playerSpeed;
    }
    this.baddieShooting();
    this.baddieComing();
    this.checkGoodGuysAlive();
  },

  switching: function() {
    if (game.time.now > this.switchTime) {
      if (this.bullets === this.bagels) {
        this.setupCurrentBullets(this.weapoons);
      } else if (this.bullets === this.weapoons) {
        this.setupCurrentBullets(this.bagels);
      }
      this.switchTime = game.time.now + this.switchRate;
    }
  },

  shooting: function() {
    if (game.time.now > this.shootTime) {
      var bullet = this.bullets.getFirstExists(false);
      if (bullet) {
        bullet.reset(this.player.x, this.player.y);
        bullet.body.velocity.y = this.bulletSpeed;
      }
      this.shootTime = game.time.now + this.shootRate;
    }
  },

  baddieShooting: function() {
    if (game.time.now > this.nextBaddieShootTime) {
      var baddie = this.baddies.getRandom();
      var baddieWeapoon = this.baddieWeapoons.getFirstExists(false);
      if (baddie && baddieWeapoon) {
        baddieWeapoon.reset(baddie.x, baddie.y);
        baddieWeapoon.body.velocity.x = (this.player.x- baddie.x)/2;
        baddieWeapoon.body.velocity.y = (this.player.y- baddie.y)/2;
      }
      this.nextBaddieShootTime = game.time.now + this.baddieShootRate;
    }
  },

  baddieComing: function() {
    if (game.time.now > this.nextBaddieArriveTime) {
      var baddie = this.baddies.create(game.rnd.between(50, 750), game.rnd.between(50, 250), 'baddie');
      baddie.body.bounce.x = 1;
      baddie.body.velocity.x = game.rnd.between(-60, 60);
      baddie.body.collideWorldBounds = true;
      this.nextBaddieArriveTime = game.time.now + this.baddieArriveRate;
    }
  },

  playerDied: function(baddieWeapoon, player) {
    player.kill();
    baddieWeapoon.kill();
    var gameOverStatus = 'You are killed >.<';
    this.gameOver(gameOverStatus);
  },

  checkGoodGuysAlive: function() {
    var vecnaGuy = this.vecnaPeople.getFirstExists(true);
    if (!vecnaGuy) {
      var gameOverStatus = 'You killed all the hungry good people!!!!!';
      this.gameOver(gameOverStatus);
    }
  },

  feedBaddie: function(bagel, baddie) {
    bagel.kill();
    this.score -= 10;
    if (this.score < 0) {
      this.score = 0;
      var gameOverStatus = 'Your fed too many baddies o.O';
      this.gameOver(gameOverStatus);
    } else {
      this.scoreText.text = 'Score: ' + this.score;
    }
  },

  killTarget: function(weapoon, target) {
    weapoon.kill();
    target.kill();
  },

  feedVecnaGuy: function(bagel, vecnaGuy) {
    bagel.kill();
    vecnaGuy.scale.setTo(vecnaGuy.scale.x * 1.1, vecnaGuy.scale.y * 1.1);
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
  },

  gameOver: function(gameOverStatus) {
    game.add.tween(game.world).to( { alpha: 0 }, 2000, "Linear", true);
    game.time.events.add(Phaser.Timer.SECOND * 2, switchToEndState, this);
    function switchToEndState() {
      var clearWorld = true;
      var clearCache = false;
      game.state.start('end', clearWorld, clearCache, this.score, gameOverStatus);
    }
  }
}
