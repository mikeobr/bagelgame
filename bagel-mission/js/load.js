var WebFontConfig = {
    google: {
      families: ['Sniglet','Bungee Inline', 'Orbitron']
    }
};

var loadState = {
  preload: function() {
    game.load.image('sky', 'assets/nightSky.png');
  	game.load.image('vecnaGuy', 'assets/angel.png');
  	game.load.image('baddie', 'assets/devil.png');
  	game.load.image('bagel', 'assets/bagel.png');
  	game.load.image('weapoon', 'assets/greenFlame.png');
  	game.load.image('baddieWeapoon', 'assets/flame.png');
    game.load.spritesheet('player', 'assets/dude.png', 32, 48);
    game.load.script("webfont", "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js");
  },

  create: function() {
    game.state.start('start');
  }
}
