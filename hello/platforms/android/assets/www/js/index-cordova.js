/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var width = screen.width;
var height = screen.height;
var screenRatio;
var realWidth;
var realHeight;

var game;
var cursors;

function preload() {
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
}

function collecStar(player, star) {
  star.kill();
}


var app = {
    // Application Constructor
    initialize: function() {
      this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      app.receivedEvent('deviceready');
      /*$('#app-container').css('height', '600px');
      $('#app-container').css('width', '800px');*/
      game = new Phaser.Game(width, height, Phaser.CANVAS, 'app-container', { preload: preload, create: create, update: update });
      alert('ready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

app.initialize();