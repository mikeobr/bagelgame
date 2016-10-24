var loseState = {
	create: function() {

		this.baddies = game.add.group();
		for (i = 0; i < 50; i ++) {
			this.baddies.create(game.world.randomX, game.world.randomY, 'baddie');
		}
		game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 20, this.tintBaddies, this);
		youLoseText = game.add.text(game.world.centerX, game.world.centerY,
			"YOU LOSE", {font: '100px RetroscapeRegular', fill: '#ff0000'});
		youLoseText.anchor.setTo(0.5, 0.5);
		tween = game.add.tween(youLoseText).to({alpha: 0}, 3000, Phaser.Easing.Linear.NONE, true);
		tween.onComplete.add(this.options, this);

	},

	tintBaddies: function() {
		this.baddies.forEach(function(baddie) {
			baddie.tint = Math.random() * 0xffffff;
		});
	},

	options: function() {
		playNextLevelText = game.add.text(game.world.centerX, game.world.centerY - 100,
			"PLAY AGAIN", {font: '50px RetroscapeRegular', fill: '#fff'});
		playNextLevelText.anchor.setTo(0.5, 0.5);
		playNextLevelText.inputEnabled = true;
		playNextLevelText.events.onInputDown.add(this.restartGame, this);

		quitText = game.add.text(game.world.centerX, game.world.centerY + 100,
			"QUIT", {font: '80px RetroscapeRegular', fill: '#ff0'});
		quitText.anchor.setTo(0.5, 0.5);
		quitText.inputEnabled = true;
		quitText.events.onInputDown.add(this.endGame, this);
	},

	restartGame: function() {
		game.baddieSpeed *= 1.1;
		game.level += 1;
		game.state.start('load');
	}, 
	endGame: function() {
		var host = window.location.hostname;
		window.location.href = 'http://' + host + ':8000/bagelgame';
	}
}