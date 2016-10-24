var startState = {
  create: function() {
    var gameTitleText = game.add.text(game.world.centerX, 200, 'BAGEL MISSION');
    gameTitleText.font = 'Orbitron';
    gameTitleText.fontSize = 72;
    gameTitleText.fontWeight = 'bold';

    grd = gameTitleText.context.createLinearGradient(0, 0, 0, gameTitleText.canvas.height);
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#004CB3');
    gameTitleText.fill = grd;
    gameTitleText.align = 'center';
    gameTitleText.anchor.setTo(.5, .5);

    var desciption = game.add.text(game.world.centerX + 100, game.world.centerY + 100, "Press any key to start");
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
