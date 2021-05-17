import 'phaser';

export default class GameScene extends Phaser.Scene {

  //********************Constructor Function********************
  // Inherits properties when creating scene.
  constructor() {
    super('Game');
  }
  //************************************************************

  //********************Init Function********************
  // Initializes variables.
  init () {
    // Start counter for score.
    this.score = 0;
    this.scoreText;
    // number of consecutive jumps made by the player
    this.playerJumps = 0;
  }
  //************************************************************

  //********************Auxiliar Functions********************
  // The core of the script: platform are added from the pool or created on the fly.
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
  //Make Player jump.
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
  //************************************************************

  //********************Create Function********************
  // Creates the scene.
  create () {

    //--------------------Background--------------------
    //  A simple background for our game.
    this.add.image(800 / 2, 600 / 2, 'sky').setScale(3);
    //--------------------------------------------------

    //--------------------Platforms--------------------
    // Group with all active platforms.
    this.platformGroup = this.add.group({
      // Once a platform is removed, it's added to the pool.
      removeCallback: function(platform){
        platform.scene.platformPool.add(platform)
      }
    });
    // Group with pooled platforms.
    this.platformPool = this.add.group({
      // Once a platform is removed from the pool, it's added to the active platforms group.
      removeCallback: function(platform){
        platform.scene.platformGroup.add(platform)
      }
    });
    // Adding the first platform to the game, the arguments are platform width and x position.
    this.addPlatform(600, 500);
    //-------------------------------------------------------------------

    //--------------------Score--------------------
    // Add score to game.
    this.scoreText = this.add.text(24, 24, 'Score: 0', { fontSize: '32px', fill: '#000' });
    //------------------------------------------------------------

    //--------------------Player--------------------
    // Add Player to the game.
    this.player = this.physics.add.sprite(300, 250, "player").setScale(1.5);
    //Set Player's gravity.
    this.player.setGravityY(900);
    // Create running animation.
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 2
      }),
      frameRate: 6,
      repeat: -1
    });
    //------------------------------------------------------------

    //--------------------Auxiliar--------------------
    // Setting collisions between the player and the platform group.
    this.physics.add.collider(this.player, this.platformGroup, function(){
      // play "run" animation if the player is on a platform.
      if(!this.player.anims.isPlaying){
        this.player.anims.play("run");
      }
    }, null, this);
    // Checking for input.
    this.input.on("pointerdown", this.jump, this);
    // A simple frame for the game
    this.frame = this.add.image(400, 300, 'frame');
    this.frame.depth = 999
    //------------------------------------------------------------
  }
  //************************************************************

  //********************Update Function********************
  // Updates the game.
  update () {

    // game over
    if(this.player.y > 800 || this.player.x < 0){
      this.scene.start("Title");
    }

    //--------------------Score--------------------
    // Refreshes the score each second.
    this.score += 1/60;
    this.scoreText.setText('Score: ' + Phaser.Math.RoundTo(this.score, 0));
    //------------------------------------------------------------

    //--------------------Platform--------------------
    // Recycling platforms.
    let minDistance = 800;
    this.platformGroup.getChildren().forEach(function(platform) {
      let platformDistance = 800 - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < - platform.displayWidth / 2){
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);
    // Adding new platforms.
    if(minDistance > this.nextPlatformDistance){
      let nextPlatformWidth = Phaser.Math.Between(100, 250);
      this.addPlatform(nextPlatformWidth, 800 + nextPlatformWidth / 2);
    }
    //------------------------------------------------------------
  }
  //************************************************************

}
