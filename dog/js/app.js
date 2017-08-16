var dogImg;
var dogImgW;
var dogImgH;
var pixels = [];
var map;

function preload(){
  //get Pixels
  dogImg = loadImage("assets/dog.jpg",function(){
    pixelDensity(1);
    dogImg.loadPixels();

    dogImgW = dogImg.width;
    dogImgH = dogImg.height;
    for(var x = 0; x<dogImgW;x++){
      var col = [];
      for(var y =0; y<dogImgH;y++){
        var index = (x+y*dogImgW)*4;
        var r = dogImg.pixels[index];
        var g = dogImg.pixels[index+1];
        var b = dogImg.pixels[index+2];
        col.push(r+","+g+","+b);
      }
      pixels.push(col);
    }
  });
}

function setup() {
  map = [];
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  for(var i = 0; i<dogImgW;i++){
    for(var j = 0; j<dogImgH;j++){
        var c = pixels[i][j].split(",");
        var r = c[0];
        var g = c[1];
        var b = c[2];
        map.push(new P(i,j,r,g,b,random(0,width),random(0,height),random(-6,6),random(-6,6)));
    }
  }
  mouseX = width/2;
  mouseY = height/2;
}

function windowResized() {
  setup();
}

function mouseClicked(){
  var mapLenght = map.length;
  for(var i=0;i<mapLenght;i++)
    map[i].moveTo(mouseX,mouseY);
}

function keyPressed() {
  if(keyCode === 32){
    var mapLenght = map.length;
    for(var i=0;i<mapLenght;i++){
        map[i].vx = random(-6,6);
        map[i].vy = random(-6,6);
    }
  }
}

function draw(){
  background('#002F2F');

  textSize(32);
  noStroke();
  textAlign(CENTER);
  stroke('#046380');
  text("DOG", width/2,height/6);

  var mapLenght = map.length;
  for(var i=0;i<mapLenght;i++)
    map[i].update();
}


function P(imgX,imgY,r,g,b, x,y,vx,vy){
  this.imgX = imgX;
  this.imgY = imgY;

  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;

  this.r = r;
  this.g = g;
  this.b = b;
}

P.prototype.draw = function(){
  fill(this.r,this.g,this.b);
  point(this.x,this.y);
}

P.prototype.update = function(){
  var d = dist(this.x,this.y,mouseX,mouseY);
  if(d>200) this.moveTo(mouseX,mouseY)

  if(this.x+this.vx>width || this.x+this.vy <0)
    this.vx = -this.vx;
  if(this.y+this.vy>height || this.y+this.vy<0)
    this.vy = -this.vy;

  this.x += this.vx;
  this.y += this.vy;

  this.draw();
}

P.prototype.moveTo = function(x,y){
  this.speed = 20;


  var dx = (x + this.imgX) - this.x - dogImgW/2;
  var dy = (y + this.imgY) - this.y - dogImgH/2;

  this.vx = dx/this.speed;
  this.vy = dy/this.speed;
}
