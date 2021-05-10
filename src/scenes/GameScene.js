class PlayGame extends Phaser.Scene{

  constructor() {
    super('PlayGame');
  }

  preload () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('platform', 'assets/platform.png');
  }

  create () {
    //  A simple background for our game
    this.add.image(400, 300, 'sky')

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
    this.addPlatform(800, 400);
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
      platform = this.physics.add.sprite(posX, 568, "platform");
      platform.setImmovable(true);
      platform.setVelocityX(-350);
      this.platformGroup.add(platform);
    };
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(2, 3);
  }

  update () {
    // recycling platforms
    let minDistance = 400;
    this.platformGroup.getChildren().forEach(function(platform) {
      let platformDistance = 400 - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < - platform.displayWidth / 2){
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);
    // adding new platforms
    if(minDistance > this.nextPlatformDistance){
      var nextPlatformWidth = Phaser.Math.Between(50, 250);
      this.addPlatform(nextPlatformWidth, 800 + nextPlatformWidth / 2);
    }
  }
}

export default PlayGame;
