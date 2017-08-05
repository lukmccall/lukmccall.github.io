/**
 * Created by LukMcCall on 05.08.2017.
 */
var canvas = document.querySelector('canvas');
var c = canvas.getContext("2d");
var navWidth = 0;

var player;
var obstacles;

var keyMap = {
    37: false, //ArrowLeft
    38: false, //ArrowUp
    39: false, //ArrowRight
    40: false //ArrowDown
};

var playerSettings ={
    movement:{
        velocity:{
            x: 5,
            y: 5
        }
    },
    geometry:{
        width: 30,
        height: 30
    }
};

var gameSettings ={
    obstacle:{
        num: 15,
        geometry:{
            width:{
                min: 5,
                max: 200
            },
            height:{
                min: 5,
                max: 200
            }
        }
    }

};

var vector = {
    x: 0,
    y: 0
};

var colors = {
    player: '#962D3E',
    bg: '#343642',
    obstacle: '#979C9C',
    text: "#F2EBC7",
    gui: "#348899"

};

addEventListener("resize", function () {
    canvas.width = innerWidth-navWidth;
    canvas.height = innerHeight;

    init();
});

function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

addEventListener("keydown", function (event) {
    if(event.keyCode in keyMap){
        keyMap[event.keyCode] = true;
        if(keyMap[37] && !keyMap[39]) vector.x = -1;
        if(!keyMap[37] && keyMap[39]) vector.x = 1;
        if(keyMap[38] && !keyMap[40]) vector.y = -1;
        if(!keyMap[38] && keyMap[40]) vector.y = 1;

        if(event.keyCode === 37) vector.x = -1;
        if(event.keyCode === 38) vector.y = -1;
        if(event.keyCode === 39) vector.x = 1;
        if(event.keyCode === 40) vector.y = 1;
    }
});

addEventListener("keyup", function (event) {
   if(event.keyCode in keyMap) {
       keyMap[event.keyCode] = false;
       if(!keyMap[37] && !keyMap[39]) vector.x = 0;
       if(!keyMap[38] && !keyMap[40]) vector.y = 0;
   }
});

function Player(x ,y) {
    this.x = x;
    this.y = y;
}
Player.prototype.move = function () {
    this.checkCollision();
    if((this.x + playerSettings.geometry.width/2 + vector.x * playerSettings.movement.velocity.x) > canvas.width){
      this.x = canvas.width - playerSettings.geometry.width/2;
    }else if((this.x - playerSettings.geometry.width/2 + vector.x * playerSettings.movement.velocity.x) < 0){
        this.x = playerSettings.geometry.width/2;
    }else{
        this.x += (vector.x * playerSettings.movement.velocity.x);
    }

    if((this.y + playerSettings.geometry.height/2 + vector.y * playerSettings.movement.velocity.y) > canvas.height){
        this.y = canvas.height - playerSettings.geometry.height/2;
    }else if((this.y - playerSettings.geometry.height/2 + vector.y * playerSettings.movement.velocity.y) < 0){
        this.y = playerSettings.geometry.height/2;
    }else {
        this.y += (vector.y * playerSettings.movement.velocity.y);
    }
};
Player.prototype.draw = function () {
    c.fillStyle = colors.player;
    c.fillRect(this.x-playerSettings.geometry.width/2, this.y-playerSettings.geometry.height/2, playerSettings.geometry.width, playerSettings.geometry.height);
};

Player.prototype.update = function () {
    this.move();
    this.draw();
};


Player.prototype.checkCollision = function () {
    for(var i=0; i<obstacles.length; i++){
        if(obstacles[i].collisonWithPlayer()) obstacles[i].drawCollison();
    }
};

function RectagleObject(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

RectagleObject.prototype.spawnCollison = function () {
    var w = 0.5 * (playerSettings.geometry.width + this.width);
    var h = 0.5 * (playerSettings.geometry.height + this.height);
    var dx = player.x - this.x;
    var dy = player.y - this.y;
    return Math.abs(dx) <= w && Math.abs(dy) <= h;
};

RectagleObject.prototype.collisonWithPlayer = function () {
   var w = 0.5 * (playerSettings.geometry.width + this.width);
   var h = 0.5 * (playerSettings.geometry.height + this.height);
   var dx = player.x - this.x;
   var dy = player.y - this.y;

   if(Math.abs(dx) <=w && Math.abs(dy) <= h){
       var wy = w * dy;
       var hx = h * dx;
       if (wy > hx) {
           if (wy > -hx) {
               if(vector.y<0) vector.y = 0;
               player.y = this.y + this.height / 2 + playerSettings.geometry.height / 2;
           }
           else {
               if(vector.x>0) vector.x = 0;
               player.x = this.x - this.width / 2 - playerSettings.geometry.width / 2;
           }
       }
       else {
           if (wy > -hx) {
               if(vector.x<0) vector.x = 0;
               player.x = this.x + this.width / 2 + playerSettings.geometry.width / 2;
           }
           else {
               if(vector.y>0) vector.y = 0;
               player.y = this.y - this.height / 2 - playerSettings.geometry.height / 2;
           }
       }
       return true;
   } return false;

};
RectagleObject.prototype.drawCollison = function () {
    c.fillStyle = colors.gui;
    c.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
};
RectagleObject.prototype.draw = function(){
    c.fillStyle = colors.obstacle;
    c.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
};

canvas.width = innerWidth-navWidth;
canvas.height = innerHeight;



function drawBackground() {
    c.fillStyle = colors.bg;
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawUi() {
    c.font = "48px Sedgwick Ave";
    c.fillStyle = colors.text;
    c.textAlign = "center";
    c.fillText("SIMPLE MOVEMENT",canvas.width/2,canvas.height/4);
    c.font = "18px Roboto";
    c.fillStyle = colors.gui;
    c.textAlign = "left";
    c.fillText("X: " + player.x, 10, 25);
    c.fillText("Y: " + player.y, 10, 50);
}

function init() {
    obstacles = [];
    player = new Player(canvas.width/2, canvas.height/2);
    for(var i = 0; i < gameSettings.obstacle.num; i++){
        do{
            var width = randomInt(gameSettings.obstacle.geometry.width.min,gameSettings.obstacle.geometry.width.max);
            var height = randomInt(gameSettings.obstacle.geometry.height.min,gameSettings.obstacle.geometry.height.max);
            var x = randomInt(width/2,canvas.width-width/2);
            var y = randomInt(height/2,canvas.height-height/2);
            var obj = new RectagleObject(x,y,width,height);
        }while (obj.spawnCollison());
        obstacles.push(obj);
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    for(var i = 0; i < obstacles.length; i++){
        obstacles[i].draw();
    }

    drawUi();
    player.update();
}
init();
animate();