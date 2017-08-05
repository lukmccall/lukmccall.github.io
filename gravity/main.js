/**
 * Created by LukMcCall on 05.08.2017.
 */

var canvas = document.querySelector('canvas');
var form = document.querySelector('#options');
var nav = document.querySelector('.nav');
var shootBtn = document.querySelector('#shootBtn');
var options = form.elements;
var c = canvas.getContext("2d");

var navWidth = 300;
var gravity = 0.5;
var friction = 0.9;
var deceleration = 0.99;
var isGrabing = false;
var circlesNumber = 5;
var acceleration = {
    dx: {
      min: -5,
      max: 5
    },
    dy :{
        min: -5,
        max: 5
    }
};
var radius = {
    min: 20,
    max: 50
};

var mouse = {
    x: 0,
    y: 0,
    xMovement: 0,
    yMovement: 0
};
var colors = {
    main: '#2C3E50',
    circle: '#E74C3C'
};

var shootPower = {
    dx: {
        min: -20,
        max: 20
    },
    dy :{
        min: -20,
        max: 20
    }
};

var shootInterval = 0;
var interval;
var circles;

canvas.width = innerWidth-navWidth;
canvas.height = innerHeight;

nav.style.width=navWidth+'px';
nav.style.height= innerHeight+'px';

addEventListener("resize", function () {
    canvas.width = innerWidth-navWidth;
    canvas.height = innerHeight;

    nav.style.width=navWidth+'px';
    nav.style.height= innerHeight+'px';

    init();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    optionsSet();
    init();
});

shootBtn.addEventListener("click", function () {

    for(var i = 0; i < circles.length; i++){
        circles[i].shoot();
    }

    if(shootInterval>0){
        interval = setInterval(function () {
            for(var i = 0; i < circles.length; i++){
                circles[i].shoot();
            }
        }, shootInterval);
    }
});

canvas.addEventListener("mousemove", function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.xMovement = event.movementX;
    mouse.yMovement = event.movementY;
});

nav.addEventListener("mousemove", function (event) {
    mouse.x = undefined;
    mouse.y = undefined;
    mouse.xMovement = undefined;
    mouse.yMovement = undefined;
});

canvas.addEventListener("click", function () {
    for(var i=0; i<circles.length; i++){
        circles[i].drop();
    }
});

function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function limitValue(val, min, max) {
    return val < min ? min : (val > max ? max : val);
}

function drawBackground() {
    c.fillStyle = colors.main;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.font = "48px Sedgwick Ave";
    c.fillStyle = "#ECF0F1";
    c.textAlign = "center";
    c.fillText("GRAVITY",canvas.width/2,canvas.height/4);
}

function optionsInit() {
    options.gravity.value = gravity;
    options.friction.value = friction;
    options.deceleration.value = deceleration;

    options.circlesNumber.value = circlesNumber;
    options.minRadius.value = radius.min;
    options.maxRadius.value = radius.max;
    options.dxmin.value = acceleration.dx.min;
    options.dxmax.value = acceleration.dx.max;
    options.dymin.value = acceleration.dy.min;
    options.dymax.value = acceleration.dy.max;
    options.dxminShoot.value = shootPower.dx.min;
    options.dxmaxShoot.value = shootPower.dx.max;
    options.dyminShoot.value = shootPower.dy.min;
    options.dymaxShoot.value = shootPower.dy.max;
    options.shootInterval.value = shootInterval;

}

function optionsSet() {

    gravity = Number(options.gravity.value);
    friction = Number(options.friction.value);
    deceleration = Number(options.deceleration.value);

    circlesNumber = Number(options.circlesNumber.value);
    radius.min = Number(options.minRadius.value);
    radius.max = Number(options.maxRadius.value);
    acceleration.dx.min = Number(options.dxmin.value);
    acceleration.dx.max = Number(options.dxmax.value);
    acceleration.dy.min = Number(options.dymin.value);
    acceleration.dy.max = Number(options.dymax.value);
    shootPower.dx.min = Number(options.dxminShoot.value);
    shootPower.dx.max = Number(options.dxmaxShoot.value);
    shootPower.dy.min = Number(options.dyminShoot.value);
    shootPower.dy.max = Number(options.dymaxShoot.value);
    shootInterval = Number(options.shootInterval.value);
}

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.isGrab = false;
    this.isDroping = false;
}

Circle.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0, Math.PI*2);
    c.fillStyle= this.color;
    c.fill();
    c.lineWidth = 2;
    c.stroke();
    c.closePath();
};

Circle.prototype.mouseDist = function () {
    var xD = this.x - mouse.x;
    var yD = this.y - mouse.y;
    return Math.sqrt(Math.pow(xD,2)+Math.pow(yD,2));
};

Circle.prototype.grab = function () {
    if(!isGrabing && !this.isDroping && this.mouseDist()-this.radius < 0) {
        isGrabing = true;
        this.isGrab = true;
    }
};

Circle.prototype.drop = function () {
    if(this.isGrab) {
        isGrabing = false;
        this.dx = limitValue(mouse.xMovement, -30, 30);
        this.dy = limitValue(mouse.yMovement, -30, 30);
        this.y = mouse.y;
        this.x = mouse.x;
        this.isGrab = false;
        this.isDroping = true;
        setTimeout(function () {
            this.isDroping = false;
        }.bind(this), 350);
    }
};

Circle.prototype.update = function () {
    this.grab();
    if(this.isGrab) {
        this.x = mouse.x;
        this.y = mouse.y;
    }else{
        if(this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.dy * friction;
        }else if(this.y - this.radius + this.dy < 0 ){
            this.dy = -this.dy;
        }else{
            this.dy += gravity;
        }

        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0 )
            this.dx = -this.dx;
        else
            this.dx *= deceleration;

        this.x += this.dx;
        this.y += this.dy;
    }
    this.draw();
};

Circle.prototype.shoot = function () {
  if(!this.isGrab){
      this.dx = randomInt(shootPower.dx.min, shootPower.dx.max)
      this.dy = randomInt(shootPower.dy.min, shootPower.dy.max)
  }
};

function init() {
    clearInterval(interval);
    circles = [];
    isGrabing = false;
    for(var i = 0; i < circlesNumber; i++){
        var r = randomInt(radius.min,radius.max);
        var x = randomInt(r, canvas.width-r);
        var y = randomInt(r, canvas.height-r);
        var dx = randomInt(acceleration.dx.min, acceleration.dx.max);
        var dy = randomInt(acceleration.dy.min, acceleration.dy.max);
        circles.push(new Circle(x,y,dx,dy,r,colors.circle));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    for(var i=0; i<circles.length; i++){
        circles[i].update();
    }


}

init();
animate();
optionsInit();
