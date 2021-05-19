import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(400, 300, 'sky').setScale(3);
    this.add.image(400, 300, 'frame');

    // Game
    this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    // Leaderboard Score
    this.leaderboardButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.leaderboardButton, -1);

    this.leaderboardText = this.add.text(0, 0, 'Leaderboard', { fontSize: '24px', fill: '#fff' });
    this.centerButtonText(this.leaderboardText, -1);

    this.leaderboardButton.on('pointerdown', () => {
      this.scene.start('Leaderboard');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(400, 300 - offset * 100, 800, 600),
    );
  }

  centerButtonText(gameText, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameText,
      this.add.zone(400, 300 - offset * 100, 800, 600),
    );
  }
}
