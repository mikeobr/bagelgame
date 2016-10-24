var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

game.state.add('load', loadState);
game.state.add('play', playState);
game.state.add('win', winState);

game.state.start('load');