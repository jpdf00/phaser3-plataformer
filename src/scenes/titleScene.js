import 'phaser';
import config from '../gameConfig/config.js';

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create () {
    this.add.image(400, 300, 'sky').setScale(3);
    this.add.image(400, 300, 'frame');

    // Game
    this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', (pointer) => {
      this.scene.start('Game');
    });

    //Leaderboard Score
    this.leaderboardButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.leaderboardButton, -1);

    this.leaderboardText = this.add.text(0, 0, "Leaderboard", { fontSize: '24px', fill: '#fff' });
    this.centerButtonText(this.leaderboardText, this.leaderboardButton);

    this.leaderboardButton.on('pointerdown', pointer => {
      this.scene.start('Leaderboard');
    });

    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerButton (gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height)
    );
  }

  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }
};
