import 'phaser';
//import PlayGame from './scenes/GameScene.js';

class playGame extends Phaser.Scene{

  constructor() {
    super('PlayGame');
  }

  preload () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('platform', 'assets/building.png');
    this.load.spritesheet('player', 'assets/cat.png', { frameWidth: 32, frameHeight: 27 });
  }

  create () {
    //  A simple background for our game
    this.add.image(game.config.width / 2, game.config.height / 2, 'sky').setScale(3);

    // group with all active platforms.
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback: function(platform){
        platform.scene.platformPool.add(platform)
      }
    });

    // pool
    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function(platform){
        platform.scene.platformGroup.add(platform)
      }
    });

    // adding a platform to the game, the arguments are platform width and x position
    this.addPlatform(game.config.width, game.config.width / 2);
    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    this.player = this.physics.add.sprite(400, 250, "player").setScale(1.5);
    this.player.setGravityY(900);

    this.anims.create({
           key: "run",
           frames: this.anims.generateFrameNumbers("player", {
               start: 0,
               end: 2
           }),
           frameRate: 6,
           repeat: -1
       });

       // setting collisions between the player and the platform group
       this.physics.add.collider(this.player, this.platformGroup, function(){
           // play "run" animation if the player is on a platform
          if(!this.player.anims.isPlaying){
               this.player.anims.play("run");
          }
       }, null, this);

       // checking for input
     this.input.on("pointerdown", this.jump, this);
  };

  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX) {
    let platform;

    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, Phaser.Math.Between(464, 650), "platform");
      platform.setImmovable(true);
      platform.setVelocityX(-350);
      platform.setFrictionX(0);
      this.platformGroup.add(platform);
    };
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(50, 350);
  }

  jump() {
    if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < 2)){
        if(this.player.body.touching.down){
            this.playerJumps = 0;
        }
        this.player.setVelocityY(500 * -1);
        this.playerJumps ++;

        // stops animation
        this.player.anims.stop();
    }
  }

  update () {
    // recycling platforms
    let minDistance = game.config.width;
    this.platformGroup.getChildren().forEach(function(platform) {
      let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < - platform.displayWidth / 2){
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);
    // adding new platforms
    if(minDistance > this.nextPlatformDistance){
      var nextPlatformWidth = Phaser.Math.Between(50, 250);
      this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
    }
  }
}

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: playGame
};

var game = new Phaser.Game(config);
