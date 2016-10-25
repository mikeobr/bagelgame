var loseState = {
  create: function() {
    var loseLabel = game.add.text(80, 80, 'YOU LOST!', {font: '50px Arial', fill: '#ffffff'});
    var startLabel = game.add.text(80, game.world.height-80, 'Press "R" to restart', {font: '20px Arial', fill: '#ffffff'});
    var rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    rKey.onDown.addOnce(this.restart, this);
  },

  restart: function() {
    game.state.start('load');
  },
}