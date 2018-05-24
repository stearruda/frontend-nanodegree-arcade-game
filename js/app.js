/*
 ****** ENEMY CONSTRUCTOR ******
*/
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,

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

    // https://discussions.udacity.com/t/how-do-i-define-the-enemys-speed/185100
    this.x = this.x + (this.speed * dt);
    
    if (this.x > 506) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// When enemy and player collision happen = they occupy the same space
Enemy.prototype.checkCollisions = function() {
    // Check if enemy and player are at same line
    if (this.y === player.y) {
        // Check if enemy and player are touching horizontaly
        let enemyRightSideX = this.x + 101;
        let playerRightSideX = player.x + 101;
        if((enemyRightSideX > player.x) && !(playerRightSideX < this.x)){
            player.x = 200;
            player.y = 400;
            console.log('hit!');
        }
    } 
};


/*
 ****** PLAYER CONSTRUCTOR ******
*/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // Variables applied to each of our instances go here,

    // The image/sprite for the player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle direction of Player
Player.prototype.handleInput = function(key) {
    if (key === 'up') {
        this.y -= 90;

        // Check if Player reaches the "Water Block" = Wins the game
        if(this.y === -50) {
            this.x = 200;
            this.y = 400;
            console.log('You won!')
        }
    } else if (key === 'down') {
        this.y += 90;

        // Bottom boundary 
        if(this.y === 490) {
            this.y = 400;
        }
    } else if (key === 'left') {
        this.x -= 100;

        // Left boundary 
        if (this.x === -100) {
            this.x = 0;
        } 
    } else if (key === 'right') {
        this.x += 100;

        // Right boundary
        if (this.x === 500) {
            this.x = 400;
        }
    }
};



/*
 ****** INSTANTIATE OBJECTS ******
*/
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let enemy_1 = new Enemy(0, 40, 180);
let enemy_2 = new Enemy(0, 130, 100);
let enemy_3 = new Enemy(0, 220, 50);
let allEnemies = [enemy_1, enemy_2, enemy_3];
// Place the player object in a variable called player
let player = new Player(200, 400);



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