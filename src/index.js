import 'regenerator-runtime/runtime.js';
import Phaser from 'phaser';
import config from './gameConfig/config.js';
import GameScene from './scenes/gameScene.js';
import BootScene from './scenes/bootScene.js';
import PreloaderScene from './scenes/preloaderScene.js';
import TitleScene from './scenes/titleScene.js';
import GameOverScene from './scenes/gameOverScene.js';
import LeaderboardScene from './scenes/leaderboardScene.js';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Leaderboard', LeaderboardScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
