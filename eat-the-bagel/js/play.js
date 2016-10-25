var playState = {

	cellSize: 32,
	bufferSize: 5,

	directions: {
		'left': {x:-1 , y:0},
		'right': {x:1 , y:0}, 
		'up': {x:0, y:-1},
		'down': {x:0, y:1}
	},

	create: function() {
		this.createMaze();
		this.createPacman();
		this.createBaddies();
		this.flashLevel();
	},

	createMaze: function() {
		this.walls = game.add.group();
		this.walls.enableBody = true;
		startingEdge = this.cellSize + this.bufferSize;
		endingEdge = game.world.height - 9 * this.cellSize - this.bufferSize;
		this.drawV(this.walls, this.cellSize * 1.5,
			game.rnd.between(startingEdge, endingEdge));
		this.drawE(this.walls, this.cellSize * 5.5 + this.bufferSize * 3,
			game.rnd.between(startingEdge, endingEdge));
		this.drawC(this.walls, this.cellSize * 9.5 + this.bufferSize * 4,
			game.rnd.between(startingEdge, endingEdge));
		this.drawN(this.walls, this.cellSize * 13.5 + this.bufferSize * 5,
			game.rnd.between(startingEdge, endingEdge));
		this.drawA(this.walls, this.cellSize * 18.5 + this.bufferSize * 6,
			game.rnd.between(startingEdge, endingEdge));
	},

	createWall: function(walls, x, y) {
		wall = walls.create(x, y, 'wall');
		wall.body.immovable = true;
		wall.scale.setTo(0.17, 0.19);
	},

	createPacman: function() {
		this.pacman = game.add.sprite(0, 0, 'pacman');
		this.pacman.scale.setTo(this.cellSize/game.cache.getImage('pacman').width,
			this.cellSize/game.cache.getImage('pacman').height);
		this.pacman.speed = 150;
		game.physics.arcade.enable(this.pacman);
		this.pacman.body.collideWorldBounds = true;
		this.pacman.direction = 'start';
	},

	createBaddies: function() {
		this.baddies = game.add.group();
		this.baddies.enableBody = true;
		baddieLocs = [ { x: 0, y: game.world.height }, { x: game.world.width, y: game.world.height }, { x: game.world.width, y: 0} ];
		for (i = 0; i < baddieLocs.length; i++) {
			baddie = this.baddies.create(baddieLocs[i].x, baddieLocs[i].y, 'baddie');
			game.physics.arcade.enable(baddie);
			baddie.body.collideWorldBounds = true;
			baddie.body.bounce.y = 1;
			baddie.body.bounce.x = 1;
		}
	},

	flashLevel: function() {
		style = {font: '100px RetroscapeRegular', fill: '#fff'};
		levelText = game.add.text(game.world.centerX, game.world.centerY, "LEVEL: " + game.level.toString(), style);
		levelText.anchor.setTo(0.5, 0.5);
		tween = game.add.tween(levelText).to( {alpha: 0}, 2000, Phaser.Easing.Linear.NONE, true);
		tween.onComplete.add(this.randomBaddieDirection, this);
	},

	randomBaddieDirection:function() {
		directionKeys = Object.getOwnPropertyNames(this.directions);
		this.baddies.forEach(function(baddie) {
			newDirection = directionKeys[game.rnd.between(0, 3)];
			baddie.body.velocity.x = this.directions[newDirection].x * game.baddieSpeed;
			baddie.body.velocity.y = this.directions[newDirection].y * game.baddieSpeed;
		}.bind(this));
	},

	changeBaddieDirection: function() {
		pacman = this.pacman;
		this.baddies.forEach(function(baddie) {
			xDist = Math.abs(baddie.body.x - pacman.body.x);
			yDist = Math.abs(baddie.body.y - pacman.body.y);
			if (yDist < xDist) {
				if (baddie.body.x > pacman.body.x) {
					newDirection = 'left';
				} else {
					newDirection = 'right';
				}
			} else {
				if (baddie.body.y > pacman.body.y) {
					newDirection = 'up';
				} else {
					newDirection = 'down';
				}
			}
			baddie.body.velocity.x = this.directions[newDirection].x * game.baddieSpeed;
			baddie.body.velocity.y = this.directions[newDirection].y * game.baddieSpeed;
		}.bind(this));
	},

	changePacmanDirection: function(newDirection) {
		velocities = this.directions[newDirection];
		this.pacman.body.velocity.x = velocities.x * this.pacman.speed;
		this.pacman.body.velocity.y = velocities.y * this.pacman.speed;
	},

	win: function() {
		this.bagel.kill();
		this.pacman.body.velocity = 0;
		this.baddies.forEach(function(baddie) {
			baddie.body.velocity = 0;
		})
		game.state.start('win');
	},

	lose: function() {
		this.pacman.kill();
		this.baddies.forEach(function(baddie) {
			baddie.body.velocity = 0;
		})
		game.state.start('lose');
	},

	update: function() {
		game.physics.arcade.collide(this.pacman, this.walls);
		baddiesCollideWithWalls = game.physics.arcade.collide(this.baddies, this.walls);
		if (baddiesCollideWithWalls) {
			this.randomBaddieDirection();
		}
		game.physics.arcade.collide(this.baddies, this.baddies);

		game.physics.arcade.overlap(this.pacman, this.bagel, this.win, null, this);
		game.physics.arcade.overlap(this.pacman, this.baddies, this.lose, null, this);
		cursor = game.input.keyboard.createCursorKeys();

		var newDirection;
		if (cursor.left.isDown) {
			newDirection = 'left';
		} else if (cursor.right.isDown) {
			newDirection = 'right';
		} else if (cursor.up.isDown) {
			newDirection = 'up';
		} else if (cursor.down.isDown) {
			newDirection = 'down';
		}
		if (newDirection != undefined && newDirection != this.pacman.direction) {
			this.changePacmanDirection(newDirection);
			if (Math.random() > 0.8) {
				this.randomBaddieDirection();
			} else {
				this.changeBaddieDirection();
			}
			this.pacman.direction = newDirection;
		}
	},

	drawVerticalLine: function(walls, height, xPos, yStart) {
		var yPos = yStart;
		for (i = 0; i < height; i++) {
			this.createWall(walls, xPos, yPos);
			yPos += this.cellSize;
		}
	},

	drawHorizontalLine: function(walls, length, xStart, yPos) {
		var xPos = xStart;
		for (i = 0; i < length; i++) {
			this.createWall(walls, xPos, yPos);
			xPos += this.cellSize;
		}
	},

	createBagel: function(xPos, yPos) {
		this.bagel = game.add.sprite(xPos, yPos, 'bagel-small');
		game.physics.arcade.enable(this.bagel);
		this.bagel.body.immovable = true;
	},

	drawV: function (walls, xOffset, yOffset) {
		this.drawVerticalLine(walls, 7, xOffset, yOffset);
		yTop = yOffset + this.cellSize * 7;
		xLeft = xOffset + this.cellSize + this.bufferSize;
		this.createWall(walls, xLeft, yTop + this.bufferSize);
		this.drawVerticalLine(walls, 7, xLeft + this.cellSize + this.bufferSize, yOffset);
	},

	drawE: function (walls, xOffset, yOffset) {
		this.drawVerticalLine(walls, 8, xOffset, yOffset);
		xLeft = xOffset + this.cellSize
		yTop = yOffset + 3 * this.cellSize;
		this.createWall(walls, xLeft, yTop);
		this.drawHorizontalLine(walls, 2, xLeft, yOffset);
		yTop += 4* this.cellSize;
		this.drawHorizontalLine(walls, 2, xLeft, yTop);
	},

 	drawC: function(walls, xOffset, yOffset) {
 		this.drawVerticalLine(walls, 8, xOffset, yOffset);
 		xLeft = xOffset + this.cellSize;
 		this.drawHorizontalLine(walls, 2, xLeft, yOffset);
 		this.drawHorizontalLine(walls, 2, xLeft, yOffset + 7 * this.cellSize);
 		this.createBagel(xOffset + this.cellSize + this.bufferSize * 3, yOffset + 3 * this.cellSize);
	},

	drawN: function(walls, xOffset, yOffset) {
		this.drawVerticalLine(walls, 8, xOffset, yOffset);
		xLeft = xOffset + this.cellSize;
		yTop = yOffset + this.cellSize;
		this.drawHorizontalLine(walls, 2, xLeft, yTop);
		xLeft += 2* this.cellSize;
		this.drawVerticalLine(walls, 7, xLeft, yTop);
	},

 	drawA: function(walls, xOffset, yOffset) {
 		this.drawVerticalLine(walls, 8, xOffset, yOffset);
 		xLeft = xOffset + this.cellSize;
 		this.drawHorizontalLine(walls, 2, xLeft, yOffset);
 		yTop = yOffset + this.cellSize * 3;
 		this.drawHorizontalLine(walls, 2, xLeft, yTop);
 		xLeft += this.cellSize * 2;
 		this.drawVerticalLine(walls, 8, xLeft, yOffset);
	},

}
