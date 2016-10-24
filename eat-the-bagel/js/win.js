var winState = {
	create: function() {
		emitter = game.add.emitter(game.world.centerX, 0, 300);
		emitter.makeParticles('bagel');
		emitter.start(false, 5000, 250);
		youWinText = game.add.text(game.world.centerX, game.world.centerY,
			"YOU WIN!", {font: '100px RetroscapeRegular', fill: '#ff00ff'});
		youWinText.anchor.setTo(0.5, 0.5);
		tween = game.add.tween(youWinText).to({alpha: 0}, 3000, Phaser.Easing.Linear.NONE, true);
		tween.onComplete.add(this.options, this);
	},

	options: function() {
		playNextLevelText = game.add.text(game.world.centerX, game.world.centerY - 100,
			"PLAY NEXT LEVEL", {font: '50px RetroscapeRegular', fill: '#fff'});
		playNextLevelText.anchor.setTo(0.5, 0.5);
		playNextLevelText.inputEnabled = true;
		playNextLevelText.events.onInputDown.add(this.startGame, this);

		quitText = game.add.text(game.world.centerX, game.world.centerY + 100,
			"QUIT", {font: '80px RetroscapeRegular', fill: '#ff0'});
		quitText.anchor.setTo(0.5, 0.5);
		quitText.inputEnabled = true;
		quitText.events.onInputDown.add(this.endGame, this);		
	},

	startGame: function() {
		game.baddieSpeed *= 1.1;
		game.level += 1;
		game.state.start('play');
	}, 
	endGame: function() {
		var host = window.location.hostname;
		window.location.href = 'http://' + host + ':8000/codeathon';
	}
}