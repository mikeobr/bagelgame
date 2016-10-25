var game = new Phaser.Game(800, 1200, Phaser.AUTO, 'drive');

game.state.add('load', load);
game.state.add('drive', drive);
game.state.start('load');