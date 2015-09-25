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

var game = new Phaser.Game(620, 800, Phaser.AUTO, 'main-div', { preload: preload, create: create, update: update });
var cursors;


function preload() {
  game.load.image('space', 'img/space.jpg');
  game.load.spritesheet('asteroids', 'img/asteroid-spritesheet.png', 128, 130);
}

var asteroids;
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.minWidth = 155;
  this.scale.minHeight = 200;
  this.scale.maxWidth = 620;
  this.scale.maxHeight = 800;
  game.scale.refresh();

  game.add.sprite(0, 0, 'space');
  asteroids = game.add.group();
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
      alert('Device is ready!');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

app.initialize();