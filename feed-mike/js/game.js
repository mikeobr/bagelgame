var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('load', loadState);
game.state.add('start', startState);
game.state.add('play', playState);
game.state.add('end', endState);
game.state.add('backToMain', backToMainState);

game.state.start('load');
