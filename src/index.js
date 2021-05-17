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

/*
const body = document.querySelector('body');
async function postScore(){
  const data = {'name':'cat-jump-jpdf00'};
  const resp = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/jHGn9ULPvKWyvvbgeHRG/scores/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
  const result = await JSON.stringify(resp)
  console.log(result);
}
const btn = document.createElement('button');
btn.textContent = 'Test';
btn.addEventListener('click', postScore)
body.appendChild(btn);
*/
