var loadState = {
	preload: function() {
	game.load.image('baddie', 'assets/bad-broccoli-small.png');
	game.load.image('bagel-small', 'assets/bagel-small.png');
	game.load.image('bagel', '../assets/bagel.png');
	game.load.spritesheet('pacman', '../assets/hungry-mike.png');
	game.load.image('wall', 'assets/wall.png');
	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.baddieSpeed = 130;
		game.level = 1;
		this.startCountDown();
	},

	startCountDown: function() {
		this.countDownNum = 4;
		this.addTextAndTiming(''); // hack to get around waiting for fonts to load
	},

	addTextAndTiming: function(text) {
		style = {font: '100px RetroscapeRegular', fill: '#fff'};
		displayedText = game.add.text(game.world.centerX, game.world.centerY, text, style);
		displayedText.anchor.setTo(0.5, 0.5);
		if (displayedText.text == 'START!') {
			game.time.events.add(Phaser.Timer.SECOND * 0.75, this.switchState, this);
		} else {
			tween = game.add.tween(displayedText).to( { alpha: 0}, 1000, Phaser.Easing.Linear.NONE, true);
			tween.onComplete.add(this.continueCountdown, this);
		}
	},

	switchState: function() {
		game.state.start('play');
	},

	fadeOut: function() {
		tween = game.add.tween(this.text).to( {alpha: 0}, 1000, Phaser.Easing.Linear.NONE, true);
		tween.onComplete.add(this.continueCountdown, this);
	},

	continueCountdown: function() {
		if (this.countDownNum == 1) {
			this.addTextAndTiming('START!');
		} else {
			this.countDownNum -= 1;
			this.addTextAndTiming(this.countDownNum.toString());
		}
	}
};
