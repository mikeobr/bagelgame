var endState = {
  init: function(score, status) {
    this.score = "Total Score: " + score;
    this.status = status;
    this.text = "GAME OVER";
  },

  create: function() {
    game.add.tween(game.world).to( { alpha: 1 }, 2000, "Linear", true);

    var gameOverText = game.add.text(game.world.centerX, 200, this.text);
    gameOverText.font = 'Press Start 2P';
    gameOverText.fontSize = 72;
    gameOverText.fontWeight = 'bold';
    gameOverText.stroke = '#ffffff';
    gameOverText.strokeThickness = 4;
    grd = gameOverText.context.createLinearGradient(0, 0, 0, gameOverText.canvas.height);
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#004CB3');
    gameOverText.fill = grd;
    gameOverText.align = 'center';
    gameOverText.anchor.setTo(.5, .5);

    var gameOverStatusText = game.add.text(game.world.centerX, gameOverText.position.y + gameOverText.height, this.status);
    gameOverStatusText.font = 'Orbitron';
    gameOverStatusText.fontSize = 24;
    gameOverStatusText.fill = '#ff0044';
    gameOverStatusText.align = 'center';
    gameOverStatusText.anchor.setTo(.5, .5);

    var scoreText = game.add.text(game.world.centerX, gameOverStatusText.position.y + gameOverStatusText.height, this.score);
    scoreText.font = 'Orbitron';
    scoreText.fontSize = 24;
    scoreText.fill = '#ff0044';
    scoreText.align = 'center';
    scoreText.anchor.setTo(.5, .5);

    var playAgainText = game.add.text(game.world.centerX - 80, game.world.height - 200, "PLAY AGAIN");
    playAgainText.font = 'Orbitron';
    playAgainText.fontSize = '24';
    playAgainText.fill = '#fff';
    playAgainText.anchor.setTo(.5, .5);
    playAgainText.inputEnabled = true;
    playAgainText.events.onInputDown.add(this.replay, this);

    var quitText = game.add.text(game.world.centerX + 100, game.world.height - 200, "QUIT");
    quitText.font = 'Orbitron';
    quitText.fontSize = '24';
    quitText.fill = '#ff0';
    quitText.anchor.setTo(.5, .5);
    quitText.inputEnabled = true;
    quitText.events.onInputDown.add(this.backToMenu, this);
  },

  replay: function() {
    game.state.start('play');
  },

  backToMenu: function() {
    var host = window.location.hostname;
    window.location.href = 'http://' + host + ':8000/bagelgame';
  }
}
