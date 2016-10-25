var startState = {
  create: function() {
    var gameTitleText = game.add.text(game.world.centerX, 200, 'FEED HUNGRY');
    gameTitleText.font = 'Monoton';
    gameTitleText.fontSize = 72;

    grd = gameTitleText.context.createLinearGradient(0, 0, 0, gameTitleText.canvas.height);
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#004CB3');
    gameTitleText.fill = grd;
    gameTitleText.align = 'center';
    gameTitleText.anchor.setTo(.5, .5);

    var gameTitleText2 = game.add.text(game.world.centerX + 140, 300, 'MIKE');
    gameTitleText2.font = 'Monoton';
    gameTitleText2.fontSize = 120;
    gameTitleText2.fontWeight = 'bold';
    gameTitleText2.fill = '#E81111';
    gameTitleText2.stroke = '#FFFF33';
    gameTitleText2.strokeThickness = 4;
    gameTitleText2.align = 'center';
    gameTitleText2.anchor.setTo(.5, .5);

    var desciption = game.add.text(game.world.centerX + 100, game.world.centerY + 150, "Press any key to start");
    desciption.font = 'Orbitron';
    desciption.fontSize = 32;
    desciption.fill = '#ffffff';
    desciption.anchor.setTo(.5, .5);

    game.input.keyboard.addCallbacks(this, this.play);
  },

  play: function() {
    game.state.start('play');
  },

  shutdown: function() {
    game.input.keyboard.onDownCallback = null;
  }
}
