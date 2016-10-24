var playState = {

	bagels: 0,
	vegetables: 0,
	platforms: 0,
	total: 0,
 	livesText: "",
	livesLeft: 3,
	levelText: "",
	totalText: "",
	level: 1,

	create: function() {
		this.initializeBackgroundandTable;
		this.initializeScore;
		this.createPlayer;
		this.initializeBagels;
		this.initializeVegetables;
		this.killRottenFood;
	},

	initializeBackgroundandTable: function() {
		//Background
		game.add.sprite(0, 0, 'kitchen');

		//platforms
		platforms = game.add.group();
		platforms.enableBody = true;
		var table = platforms.create(0, game.world.height - 64, 'table');
		table.scale.setTo(2, 2);
		table.body.immovable = true;
	},

	initializeScore: function() {
		this.totalText = game.add.text(16, 112, 'total: 0', { fontSize: '32px', fill: '#000' });
    	this.livesText = game.add.text(16, 16, 'lives: 3', { fontSize: '32px', fill: '#000' });
    	this.levelText = game.add.text(16, 64, 'level: 1', { fontSize: '32px', fill: '#000' });
	},

	initializeBagels: function() {
		this.bagels = game.add.group();
		this.bagels.enableBody = true;
		this.createBagels;
		game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, this.createBagels, this);
	},

	initializeVegetables: function() {
		this.vegetables = game.add.group();
   		this.vegetables.enableBody = true;
   		this.createVegetables;
    	game.time.events.repeat(Phaser.Timer.SECOND * 4, 1000, this.createVegetables, this);
	},

	createPlayer: function() {
		player = game.add.sprite(35, game.world.height - 150, 'dude');
		game.physics.arcade.enable(player);
		
		//  Player physics properties. Give the little guy a slight bounce.
    	player.body.bounce.y = 0.2;
    	player.body.gravity.y = 800;
    	player.body.collideWorldBounds = true;

    	//  Our two animations, walking left and right.
    	player.animations.add('left', [0, 1, 2, 3], 10, true);
    	player.animations.add('right', [5, 6, 7, 8], 10, true);
	},

	createBagels: function() {
		for (var i = 0; i <= this.level; i++) {
			var bagel = this.bagels.create(game.world.randomX, i*6, 'bagel');
			bagel.body.gravity.y = this.level + 12;
		}
	},

	createVegetables: function() {
		this.vegetables = game.add.group();
		this.vegetables.enableBody = true;
		var veges = ['vege1','vege2','vege3'];
		for (var i = 0; i<=this.level; i++) {
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
    	game.physics.arcade.overlap(player, this.bagels, this.collectBagel, null, this);
    	game.physics.arcade.overlap(player, this.vegetables, this.suicide, null, this);
    	//  Collide the player with the platform
    	var hitPlatform = game.physics.arcade.collide(player, platforms);
    	this.controlPlayer(player);
	},

	controlPlayer: function(player) {
		cursors = game.input.keyboard.createCursorKeys();

    	//  Reset the players velocity (movement)
    	player.body.velocity.x = 0;

    	if (cursors.left.isDown) {
        	//  Move to the left
        	player.body.velocity.x = -150;
        	player.animations.play('left');
    	} else if (cursors.right.isDown) {
    	    //  Move to the right
    	    player.body.velocity.x = 150;
    	    player.animations.play('right');
   		} else {
    	    //  Stand still
    	    player.animations.stop();
    	    player.frame = 4;
    	}

    	//  Allow the player to jump if they are touching the ground.
    	if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
    	    player.body.velocity.y = -550;
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
    		player.kill();
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