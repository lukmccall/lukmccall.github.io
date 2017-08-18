var platformsNum = 80;
var platformMaxWidth = 100;
var platforms;

var player;
var moving; //1 right <> -1 left <> 0 stay

function setup() {
  createCanvas(windowWidth,windowHeight);
  rectMode(CORNER);
  platforms = [];

  for(var i = 0; i<platformsNum;i++){
    var x = parseInt(random(0,width));
    var y = parseInt(random(0,height));
    var w = parseInt(random(10,platformMaxWidth));
    var h = parseInt(random(5,platformMaxWidth/2));
    platforms.push(new Platform(x,y,w,h));
  }

  player = new Player(width/2,height/2);

}

function windowResized() {
  setup();
}

function keyPressed() {
  if(keyCode === 37)
    moving = -1;
  if(keyCode === 39)
    moving = 1;

  if(keyCode === 38 && player.isGround){
    player.y -= 1;
    player.vy = -8;
    player.isGround = false;
  }
}

function keyReleased(){
  if(keyCode === 37 || keyCode === 39)
    moving = 0;
}

function getCenter(x,y,w,h){
  return {x: x+(w/2), y:y+(h/2)};
}

function draw(){
  background('#00A388');

  textSize(32);
  noStroke();
  textAlign(CENTER);
  fill('#BEEB9F');
  text("PLATFORM", width/2,height/6);
  var isGround = false;
  var y = null;

  for(var i = 0; i<platforms.length; i++){
    platforms[i].draw();
    if(collideRectRect(player.x,player.y,player.width,player.height,
      platforms[i].x,platforms[i].y,platforms[i].width, platforms[i].height))
      {
        var playerCenter = getCenter(player.x,player.y,player.width,player.height);
        var platformCenter = getCenter(platforms[i].x,platforms[i].y,platforms[i].width,platforms[i].height);
        if(playerCenter.y > platforms[i].y && playerCenter.y < platforms[i].y+platforms[i].height){
            if(playerCenter.x < platformCenter.x){
              player.x = platforms[i].x-player.width;
            }else{
              player.x = platforms[i].x+platforms[i].width;
            }
        }
        else if(playerCenter.y > platformCenter.y){
          // y = platforms[i].y + platforms[i].height + 1;
          player.vy = player.gravity;
        }
        else if(playerCenter.y < platformCenter.y){
          isGround = true;
          y = platforms[i].y;
        }
      }
  }

  player.isGround = isGround;
  if(y)
    player.y = y - player.height;
  player.update();
}


function Platform(x,y,w,h){
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
}

Platform.prototype.draw = function(){
    fill("#FF6138");
    rect(this.x,this.y,this.width,this.height);
}

function Player(x,y){
  this.x = x;
  this.y = y;

  this.width = 10;
  this.height = 20;

  this.vx = 0;
  this.vy = 0;

  this.deaccelerate = 0.5;
  this.speed = 4;
  this.gravity = 0.25;

  this.isGround = false;
}

Player.prototype.update = function(){
  if(moving)
    this.vx = moving * this.speed;
  else if(this.vx !== 0){
    if(this.vx > 0){
        this.vx -= this.deaccelerate;
    }else{
        this.vx += this.deaccelerate;
    }
  }

  if(this.isGround)
    this.vy = 0;
  else
    this.vy += this.gravity;
  this.x += this.vx;
  this.y += this.vy;

  this.draw();
}

Player.prototype.draw = function(){
  fill("#FFFF9D");
  rect(this.x,this.y,this.width,this.height);
}
