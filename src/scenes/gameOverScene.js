import 'phaser';
import {saveScore, getScore} from './util.js';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.score = data.score;
  }

  create (){
    const div = document.querySelector("#nameInputFrame")
    const input = document.querySelector('#inputName');
    div.setAttribute('Style', 'display: flex')


    this.add.image(400, 300, 'sky').setScale(3);
    this.add.image(400, 300, 'frame');

    //Save Score
    this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, "Save", { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', pointer => {
      saveScore(input.value, this.score).then(resp => {
        console.log(resp.result)
      });
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
      this.add.zone(400, 300 - offset * 120, 800, 600)
    );
  }

  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }
}
