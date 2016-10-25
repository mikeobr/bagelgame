var loadState = {

	preload: function() {
    	game.load.image('kitchen', 'assets/kitchenBackground800X600.png');
    	game.load.image('table', 'assets/platform.png');
    	game.load.image('bagel', 'assets/bagel-small.png');
    	game.load.spritesheet('dude', 'assets/mike-dude.png', 32, 48);
    	game.load.image('vege1', 'assets/bad-broccoli-small.png');
    	game.load.image('vege2', 'assets/kale.png');
    	game.load.image('vege3', 'assets/carrots.png');
	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Start page
		var loadingLabel = game.add.text(80, 80, 'Eat bagels, not vegetables!', {font: '50px Arial', fill:'#ffffff'});
		var startLabel = game.add.text(80, game.world.height-80, 'Press "S" to start', {font: '25px Arial', fill: '#ffffff'});
    	var sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    	sKey.onDown.addOnce(this.start,this);
	},

	start:function() {
		game.state.start('play');
	},
};