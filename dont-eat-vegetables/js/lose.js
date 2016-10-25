var loseState = {
  create: function() {
    var loseLabel = game.add.text(80, 80, 'YOU LOST!', {font: '50px Arial', fill: '#ffffff'});
    var startLabel = game.add.text(80, game.world.height-160, 'Press "R" to restart', {font: '20px Arial', fill: '#ffffff'});
    var rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    rKey.onDown.addOnce(this.restart, this);

    var goToMainMenuLabel = game.add.text(80, game.world.height-80, 'Press "M" to go back to main menu', {font: '20px Arial', fill: '#ffffff'});
    var mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    mKey.onDown.addOnce(this.backToMenu, this);
  },

  restart: function() {
    game.state.start('play');
  },

  backToMenu: function() {
  	var host = window.location.hostname;
  	window.location.href = 'http://' + host + ':8080';
  },
}