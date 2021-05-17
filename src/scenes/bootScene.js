import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('frame', 'assets/frame.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
