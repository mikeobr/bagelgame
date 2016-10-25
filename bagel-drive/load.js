var load = {
  preload: function() {
    game.load.image('road', 'assets/longroad.jpg');
    game.load.image('playercar', 'assets/newcar.png');
    game.load.image('whitecar', 'assets/shucar3.png');
    game.load.image('bluecar', 'assets/redcar.png');
    game.load.image('redcar', 'assets/bluecar.png');
    game.load.image('blackcar', 'assets/blackcar.png');
    game.load.spritesheet('boom', 'assets/boomSpriteSheet.png', 200, 200);
    game.load.spritesheet('bagel', '../../assets/bagel-small.png', 200, 200);
  },

  create: function() {
    //setup initial game state
    game.speed = 5;
    game.road = game.add.tileSprite(0,0, 800, 1200, 'road');
    game.player = game.add.sprite(game.world.width - 200, game.world.height - 250, 'playercar');
    game.player.enableBody = true;

    this.startMessage = game.add.text(80, game.world.height - 80, "Press ENTER key to start");
    this.startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.flashingEvent = game.time.events.loop(Phaser.Timer.SECOND * 0.65, this.blinkText, this);
  },

  update: function() {
    if (this.startKey.isDown) {
      
      this.startMessage.destroy();
      game.state.start('drive');
    }
  },

  blinkText: function() {
    this.startMessage.visible = !this.startMessage.visible;
  }
}