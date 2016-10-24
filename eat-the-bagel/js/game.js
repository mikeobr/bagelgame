var game = new Phaser.Game(800, 600, Phaser.AUTO, 'bagel-pacman');
game.state.add('load', loadState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('lose', loseState);
game.state.start('load');