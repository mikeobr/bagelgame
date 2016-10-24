var playState = {

	create: function() {
		this.initializeBackgroundandTable();
		this.initializeScore();
		this.createPlayer();
		this.initializeBagels();
		this.initializeVegetables();
		this.killRottenFood();
	},

	initializeBackgroundandTable: function() {
		//Background
		game.add.sprite(0, 0, 'kitchen');

		//platforms
		this.platforms = game.add.group();
		this.platforms.enableBody = true;
		this.table = this.platforms.create(0, game.world.height - 64, 'table');
		this.table.scale.setTo(2, 2);
		this.table.body.immovable = true;
	},

	initializeScore: function() {
		this.total = 0;
		this.livesLeft = 3;
		this.level = 1;
		this.totalText = game.add.text(16, 112, 'total: 0', { fontSize: '32px', fill: '#000' });
    	this.livesText = game.add.text(16, 16, 'lives: 3', { fontSize: '32px', fill: '#000' });
    	this.levelText = game.add.text(16, 64, 'level: 1', { fontSize: '32px', fill: '#000' });
	},

	initializeBagels: function() {
		this.bagels = game.add.group();
		this.bagels.enableBody = true;
		this.createBagels();
		game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, this.createBagels, this);
	},

	initializeVegetables: function() {
		this.vegetables = game.add.group();
   		this.vegetables.enableBody = true;
   		this.createVegetables();
    	game.time.events.repeat(Phaser.Timer.SECOND * 4, 1000, this.createVegetables, this);
	},

	createPlayer: function() {
		this.player = game.add.sprite(35, game.world.height - 150, 'dude');
		game.physics.arcade.enable(this.player);
		
		//  Player physics properties. Give the little guy a slight bounce.
    	this.player.body.bounce.y = 0.2;
    	this.player.body.gravity.y = 800;
    	this.player.body.collideWorldBounds = true;

    	//  Our two animations, walking left and right.
    	this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    	this.player.animations.add('right', [5, 6, 7, 8], 10, true);
	},

	createBagels: function() {
		for (var i = 0; i <= this.level; i++) {
			var bagel = this.bagels.create(game.world.randomX, i*6, 'bagel');
			bagel.body.gravity.y = this.level + 12;
		}
	},

	createVegetables: function() {
		var veges = ['vege1','vege2','vege3'];
		for (var i = 0; i <= this.level; i++) {
			var veg = this.vegetables.create(-50 + game.world.randomX, i*5, veges[game.rnd.between(0, 2)]);
			veg.body.gravity.y = this.level + 5;
		}
	},

	killRottenFood: function() {
		this.bagels.setAll('outOfBoundsKill', true);
    	this.bagels.setAll('checkWorldBounds', true);

    	this.vegetables.setAll('outOfBoundsKill', true);
    	this.vegetables.setAll('checkWorldBounds', true);
	},

	update: function() {
    	game.physics.arcade.overlap(this.player, this.bagels, this.collectBagel, null, this);
    	game.physics.arcade.overlap(this.player, this.vegetables, this.suicide, null, this);
    	//  Collide the player with the platform
    	this.hitPlatform = game.physics.arcade.collide(this.player, this.platforms);
    	this.controlPlayer();
	},

	controlPlayer: function() {
		cursors = game.input.keyboard.createCursorKeys();

		//  Reset the players velocity (movement)
    	this.player.body.velocity.x = 0;

    	if (cursors.left.isDown) {
        	//  Move to the left
        	this.player.body.velocity.x = -150;
        	this.player.animations.play('left');
    	} else if (cursors.right.isDown) {
    	    //  Move to the right
    	    this.player.body.velocity.x = 150;
    	    this.player.animations.play('right');
   		} else {
    	    //  Stand still
    	    this.player.animations.stop();
    	    this.player.frame = 4;
    	}

    	//  Allow the player to jump if they are touching the ground.
    	if (cursors.up.isDown && this.player.body.touching.down && this.hitPlatform) {
    	    this.player.body.velocity.y = -550;
    	}
	},

	collectBagel: function(player, bagel) {
    	// Removes the bagel from the screen
    	bagel.kill();
    	//  Add and update the score
    	this.total += 10;
    	this.totalText.text = 'Total: ' + this.total;
    	this.levelUp(this.total);
  	},

	suicide: function(player, veggie) {
    	veggie.kill();
    	this.livesLeft -= 1;
    	this.livesText.text = 'Lives left: ' + this.livesLeft;
    	if (this.livesLeft == 0) {
    		this.livesText.text = 'GAME OVER!';
    		this.player.kill();
    		this.win();
    	}
	},

	levelUp: function(total) {
		this.level = Math.floor(this.total/50) + 1;
		this.levelText.text = 'Level: ' + this.level;
	},

	win: function() {
    	game.state.start('win');
  	},
};