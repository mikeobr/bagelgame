var WebFontConfig = {
    google: {
      families: ['Sniglet','Bungee Inline', 'Orbitron', 'Monoton', 'Press Start 2P']
    }
};

var loadState = {
  preload: function() {
    game.load.script("webfont", "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js");
    game.load.image('sky', 'assets/night-sky.png');
    game.load.image('mike', '../assets/hungry-mike.png');
    game.load.image('baddie', '../assets/bad-broccoli.png');
    game.load.image('bagel', 'assets/bagel-small.png');
    game.load.image('weapoon', 'assets/green-flame.png');
    game.load.image('baddieWeapoon', 'assets/flame.png');
    game.load.image('player', 'assets/rocket.png');
  },

  create: function() {
    game.state.start('start');
  }
}
