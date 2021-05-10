import 'phaser';
import config from './gameConfig/config.js';
import GameScene from './scenes/gameScene.js';
import BootScene from './scenes/bootScene.js';
import PreloaderScene from './scenes/preloaderScene.js';
import TitleScene from './scenes/titleScene';
//import OptionsScene from './Scenes/OptionsScene';
//import CreditsScene from './Scenes/CreditsScene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    //this.scene.add('Options', OptionsScene);
    //this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
