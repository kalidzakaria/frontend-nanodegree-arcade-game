'use strict';
// Enemies our player must avoid
/**
 * @description Enemies our player must avoid
 * @constructor 
 * @param {integer} x - position on X axis
 * @param {integer} y - position on Y axis
 * @param {integer} speed - Enemy speed
 */
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;
	
	if (this.x > 505) {
		this.x = -95;
		this.speed = Math.floor(Math.random() * 100 ) + 250;
	}
	this.checkCollisions();
};

Enemy.prototype.checkCollisions = function () {
	//Detect collisoin and resets Player position
	if ((player.y == this.y) && (player.x-75 < this.x) && (player.x+75 > this.x ))  {
		player.reset();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/**
 * @description represents the Player
 * @constructor 
 * @param {integer} x - position on X axis
 * @param {integer} y - position on Y axis
 */
const Player = function (x,y) {
	this.character = 'images/char-boy.png';
	this.x = x;
	this.y = y;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function (dt) {
	// You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

};

//Render the Player Character
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.character), this.x, this.y);
};

//Reset the player to initial position
Player.prototype.reset = function () {
	this.x = 200;
	this.y = 404;
};

//Reset the player to initial position
Player.prototype.reset = function () {
	this.x = 200;
	this.y = 404;
}

//Handles player's key strokes (Up, Down, Right, Left)
Player.prototype.handleInput = function (keypress) {
	const massage = document.querySelector(".message");
	const stepX = 102;
	const stepY = 83;
	const maxX = 404;
	const maxY = 404;
	if (keypress === 'up' && this.y > 0) {this.y -= stepY;}
	if (keypress === 'down' && this.y < maxY) {this.y += stepY;}
	if (keypress === 'right' && this.x < maxX) {this.x += stepX;}
	if (keypress === 'left' && this.x > 0) {this.x -= stepX;}
	if (this.y < 0) {
		massage.style.display = "block";
		massage.classList.add("winner");
		setTimeout(
			() => {
				massage.style.display = "none";
				massage.classList.remove("winneranimation");
				this.reset();
			}, 1000);
	}
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const enemyLocation = [72, 155, 238];

//Initialize Enemy X-location and speed randomly
enemyLocation.forEach(function(location) {
	const enemy = new Enemy(Math.floor(Math.random() * 50 ) -90, location, Math.floor(Math.random() * 100 ) + 250);
	allEnemies.push(enemy);
});

const player = new Player(200, 404);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
