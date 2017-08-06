/**
 * Created by LukMcCall on 06.08.2017.
 */
var canvas = document.querySelector('canvas');
var c = canvas.getContext("2d");
var navWidth = 0;

canvas.width = innerWidth-navWidth;
canvas.height = innerHeight;

var colors = {
    bg: "#21786C",
    ui: "#FFFBF1",
    ui2: "#410000",
    player: "#910000",
    obstacle: "#CBB370"
};

var GameSettings = {
    keyMap :{
        37: false, //ArrowLeft
        38: false, //ArrowUp
        39: false, //ArrowRight
        40: false //ArrowDown
    },
    player:{
        movement:{
            velocity:{
                x: 4,
                y: 4
            }
        },
        radius : 20
    },
    obstacle:{
        num: 6,
        min: 10,
        max: 60
    }
};

var movementVector = {
    x: 0,
    y: 0
};

var player;
var obstacles;

addEventListener("resize", function () {
    canvas.width = innerWidth-navWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener("keydown", function (event) {
    if(event.keyCode in GameSettings.keyMap){
        GameSettings.keyMap[event.keyCode] = true;
        if(GameSettings.keyMap[37] && !GameSettings.keyMap[39]) movementVector.x = -1;
        if(!GameSettings.keyMap[37] && GameSettings.keyMap[39]) movementVector.x = 1;
        if(GameSettings.keyMap[38] && !GameSettings.keyMap[40]) movementVector.y = -1;
        if(!GameSettings.keyMap[38] && GameSettings.keyMap[40]) movementVector.y = 1;

        if(event.keyCode === 37) movementVector.x = -1;
        if(event.keyCode === 38) movementVector.y = -1;
        if(event.keyCode === 39) movementVector.x = 1;
        if(event.keyCode === 40) movementVector.y = 1;
    }
});
addEventListener("keyup", function (event) {
    if(event.keyCode in GameSettings.keyMap) {
        GameSettings.keyMap[event.keyCode] = false;
        if(!GameSettings.keyMap[37] && !GameSettings.keyMap[39]) movementVector.x = 0;
        if(!GameSettings.keyMap[38] && !GameSettings.keyMap[40]) movementVector.y = 0;
    }
});

function Player(x ,y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}
Player.prototype.move = function () {
    var xMove = (movementVector.x * GameSettings.player.movement.velocity.x);
    var yMove = (movementVector.y * GameSettings.player.movement.velocity.y);

    if((this.x + GameSettings.player.radius + xMove) > canvas.width){
        this.x = canvas.width - GameSettings.player.radius;
    }else if((this.x - GameSettings.player.radius + xMove) < 0){
        this.x = GameSettings.player.radius;
    }else{
        this.x += xMove;
    }

    if((this.y + GameSettings.player.radius + yMove) > canvas.height){
        this.y = canvas.height - GameSettings.player.radius;
    }else if((this.y - GameSettings.player.radius + yMove) < 0){
        this.y = GameSettings.player.radius;
    }else {
        this.y += yMove;
    }
};
Player.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    c.fillStyle = colors.player;
    c.fill();
    c.closePath();
};

Player.prototype.update = function () {
    this.move();
    this.draw();
};

function Obstacle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

Obstacle.prototype.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2);
    c.fillStyle = colors.obstacle;
    c.fill();
};
Obstacle.prototype.drawCollison = function () {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2);
    c.fillStyle = colors.player;
    c.fill();
};

Obstacle.prototype.push = function () {
    var playerMustMove = false;
    var xMove = (movementVector.x * GameSettings.player.movement.velocity.x);
    var yMove = (movementVector.y * GameSettings.player.movement.velocity.y);

    if((this.x + this.radius + xMove) > canvas.width){
        this.x = canvas.width - this.radius;
        playerMustMove = true;
        movementVector.x *= -1;
    }else if((this.x - this.radius + xMove) < 0){
        this.x = this.radius;
        playerMustMove = true;
        movementVector.x *= -1;
    }else{
        this.x += xMove;
    }

    if((this.y + this.radius + yMove) > canvas.height){
        this.y = canvas.height - this.radius;
        playerMustMove = true;
        movementVector.y *= -1;
    }else if((this.y - this.radius + yMove) < 0){
        this.y = this.radius;
        playerMustMove = true;
        movementVector.y *= -1;
    }else {
        this.y += yMove;
    }

    if(playerMustMove) player.move();
};

function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawBackground() {
    c.fillStyle = colors.bg;
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawUi() {
    c.font = "48px Sedgwick Ave";
    c.fillStyle = colors.ui2;
    c.textAlign = "center";
    c.fillText("PUSH",canvas.width/2,canvas.height/4);
    c.font = "18px Roboto";
    c.fillStyle = colors.ui;
    c.textAlign = "left";
    c.fillText("X: " + player.x, 10, 25);
    c.fillText("Y: " + player.y, 10, 50);
}

function getDistance(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}

function getCeneneter(x1,y1,x2,y2) {
    return {x: (x1+x2)/2, y: (y1+y2)/2};
}

function drawnDistanse(x1,y1,x2,y2) {
    var center = getCeneneter(x1,y1,x2,y2);
    var distance = getDistance(x1,y1,x2,y2);

    c.beginPath();
    c.setLineDash([5, 3]);
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.strokeStyle = colors.ui;
    c.stroke();
    c.fillStyle = colors.ui2;
    c.textAlign = "left";
    c.font = "16px Roboto";
    c.fillText(distance.toFixed(2),center.x,center.y);

}

function isCollison(obj1, obj2) {
    return getDistance(obj1.x,obj1.y, obj2.x, obj2.y) < obj1.radius + obj2.radius;
}

function init() {
    obstacles=[];
    player = new Player(canvas.width/2,canvas.height/2, GameSettings.player.radius);
    for(var i =0; i< GameSettings.obstacle.num; i++) {
        do {
            var r = randomInt(GameSettings.obstacle.min, GameSettings.obstacle.max);
            var x = randomInt(r,canvas.width-r);
            var y = randomInt(r, canvas.height-r);
            var obstacle = new Obstacle(x, y, r);
        }while (isCollison({x: player.x, y: player.y, radius: GameSettings.player.radius}, {x: obstacle.x, y: obstacle.y, radius: obstacle.radius}));
        obstacles.push(obstacle);
    }
}

function animate () {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    var xMove = (movementVector.x * GameSettings.player.movement.velocity.x);
    var yMove = (movementVector.y * GameSettings.player.movement.velocity.y);
    for(var i = 0; i < obstacles.length; i++) {
        if(isCollison({x: player.x+xMove, y: player.y+yMove, radius: GameSettings.player.radius}, {x: obstacles[i].x, y: obstacles[i].y, radius: obstacles[i].radius})){
            obstacles[i].push();
            obstacles[i].drawCollison();
        }
        else {
            obstacles[i].draw();
        }
    }
    player.update();
    for(i = 0; i < obstacles.length; i++) drawnDistanse(player.x,player.y,obstacles[i].x,obstacles[i].y);
    drawUi();
}

init();
animate();