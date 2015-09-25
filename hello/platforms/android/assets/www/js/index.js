var width = screen.width;
var height = screen.height;
var screenRatio;
var realWidth;
var realHeight;

var game = new Phaser.Game(620, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;


function preload() {
  game.load.image('space', 'img/space.jpg');
  game.load.spritesheet('asteroids', 'img/asteroid-spritesheet.png', 128, 130);
}

var asteroids;
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.sprite(0, 0, 'space');
  asteroids = game.add.group();
  //asteroids = asteroids.create(0, 0, 'asteroids');
  //asteroids.animations.add('falling', [0, 1, 2, 3, 4, 5, 6], 3, true);


}

function update() {
  if (Math.random() < 0.05) {
    for (var i = 0; i < asteroids.children.length; i++) {
      asteroids.children[i].play('falling');
    }
    var currentAsteroid = asteroids.create(Math.floor((Math.random() * 620) + 1), -50, 'asteroids');
    game.physics.enable(currentAsteroid);
    currentAsteroid.inputEnabled = true;
    currentAsteroid.scale.setTo(0.5, 0.5);
    currentAsteroid.animations.add('falling', [0, 1, 2, 3, 4, 5, 6], 3, true);
    currentAsteroid.body.gravity.y = 30;
    currentAsteroid.events.onInputDown.add(destroyAsteroid, this);
  }
}

function destroyAsteroid(event) {
  event.kill();
}
/*function preload() {
  game.load.image('sky', 'img/sky.png');
  game.load.image('ground', 'img/platform.png');
  game.load.image('star', 'img/star.png');
  game.load.spritesheet('player', 'img/dude.png', 32, 48);

  if(width>height){
    realWidth=width;
    realHeight=height;
    screenRatio=(height/width);
  }
  else {
    realWidth=height;
    realHeight=width;
    screenRatio=(width/height);
  }

}

var platforms;
var stars;
function create() {
  cursors = game.input.keyboard.createCursorKeys();
    //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //  A simple background for our game
  game.add.sprite(0, 0, 'sky');
  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();
  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;
  // Here we create the ground.
  var ground = platforms.create(0, game.world.height - 64, 'ground');
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(2, 2);
  //  This stops it from falling away when you jump on it
  ground.body.immovable = true;

  //  Now let's create two ledges
  var ledge = platforms.create(400, 400, 'ground');
  ledge.body.immovable = true;
  ledge = platforms.create(-150, 250, 'ground');
  ledge.body.immovable = true;

  stars = game.add.group();
  stars.enableBody = true;

  for (var i = 0; i < 12; i++) {
    var star = stars.create(i * 70, 0, 'star');

    star.body.gravity.y = 20;
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }

  player = game.add.sprite(32, game.world.height - 150, 'player');
  game.physics.arcade.enable(player);

  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);
}

function update() {
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(stars, platforms);
  game.physics.arcade.overlap(player, stars, collecStar, null, this);

  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('left');
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('right');
  }
  else {
    player.animations.stop();
    player.frame = 4;
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -350;
  }
}

function collecStar(player, star) {
  star.kill();
}*/
