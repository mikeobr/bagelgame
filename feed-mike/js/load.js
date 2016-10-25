var WebFontConfig = {

  active: function() {
		game.time.events.add(Phaser.Timer.SECOND, loadState.startTheGame, this);
	},

  google: {
    families: ['Sniglet','Bungee Inline', 'Orbitron', 'Monoton', 'Press Start 2P']
  }
};

var loadState = {
  preload: function() {
    game.load.script("webfont", "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js");
    game.load.image('sky', 'assets/night-sky.png');
    game.load.image('mike', 'assets/hungry-mike-small.png');
    game.load.image('baddie', 'assets/bad-broccoli-small.png');
    game.load.image('bagel', 'assets/bagel-small.png');
    game.load.image('weapoon', 'assets/knife.png');
    game.load.image('baddieWeapoon', 'assets/flame.png');
    game.load.image('player', '../assets/marissa.png');
  },

  startTheGame: function() {
    game.state.start('start');
  }
}
