// Enemies our player must avoid
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
		this.speed = Math.floor(Math.random() * 100 ) + 350;
	}
	
	if ((player.y == this.y) && (player.x-51 < this.x) && (player.x+51 > this.x ))  {
		player.x = 200;
		player.y = 404;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x,y) {
	this.character = 'images/char-boy.png';
	this.x = x;
	this.y = y;
};

Player.prototype.update = function (dt) {
	
};

//Render the Player Character
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.character), this.x, this.y);
};

//Handles player's key strokes (Up, Down, Right, Left)
Player.prototype.handleInput = function (keypress) {
	const stepX = 102;
	const stepY = 83;
	const maxX = 404;
	const maxY = 404;
	if (keypress === 'up' && this.y > 0) {this.y -= stepY;}
	if (keypress === 'down' && this.y < maxY) {this.y += stepY;}
	if (keypress === 'right' && this.x < maxX) {this.x += stepX; }
	if (keypress === 'left' && this.x > 0) {this.x -= stepX;}
	if (this.y < 0) {
		setTimeout(
			function() {
				player.x = 200;
				player.y = 404;
			}, 1000);
	}
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
const enemyInit = [72, 155, 238];

enemyInit.forEach(function(location) {
	enemy = new Enemy(Math.floor(Math.random() * 10 ) -0, location, Math.floor(Math.random() * 100 ) + 300);
	allEnemies.push(enemy);
});

let player = new Player(200, 404);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
