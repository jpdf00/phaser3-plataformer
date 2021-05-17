import Phaser from 'phaser';
import { saveScore } from './util.js';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.score = data.score;
    this.saved = false;
  }

  create() {
    const div = document.querySelector('#nameInputFrame');
    const input = document.querySelector('#inputName');
    div.setAttribute('Style', 'display: flex');


    this.add.image(400, 300, 'sky').setScale(3);
    this.add.image(400, 300, 'frame');

    // Save Score
    this.saveButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.saveButton, 1);

    this.saveText = this.add.text(0, 0, 'Save Score', { fontSize: '24px', fill: '#fff' });
    this.centerButtonText(this.saveText, this.saveButton);

    this.saveButton.on('pointerdown', (pointer) => {
      if (!this.saved) {
        saveScore(input.value, this.score).then((resp) => {
          this.updateText = this.add.text(400, 100, `${resp.result}`, { fontSize: '32px', fill: '#fff' });
          this.updateText.setOrigin(0.5, 0.5);
          this.saved = true;
        });
      } else {
        this.updateText.destroy();
        this.updateText = this.add.text(400, 100, 'Score Alredy Saved', { fontSize: '32px', fill: '#fff' });
        this.updateText.setOrigin(0.5, 0.5);
      }
      input.value = '';
      div.removeAttribute('Style');
    });

    // Title Score
    this.titleButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.titleButton, 0);

    this.titleText = this.add.text(0, 0, 'Title Screen', { fontSize: '24px', fill: '#fff' });
    this.centerButtonText(this.titleText, this.titleButton);

    this.titleButton.on('pointerdown', (pointer) => {
      input.value = '';
      div.removeAttribute('Style');
      this.scene.start('Title');
    });

    // Leaderboard Score
    this.leaderboardButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.leaderboardButton, -1);

    this.leaderboardText = this.add.text(0, 0, 'Leaderboard', { fontSize: '24px', fill: '#fff' });
    this.centerButtonText(this.leaderboardText, this.leaderboardButton);

    this.leaderboardButton.on('pointerdown', (pointer) => {
      input.value = '';
      div.removeAttribute('Style');
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
      this.add.zone(400, 300 - offset * 120, 800, 600),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}
