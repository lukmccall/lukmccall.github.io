var tail;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tail = new Tail(15,60);
}

function windowResized() {
  setup();
}

function draw(){
  blendMode(BLEND);
  background('#2E0927');
  textSize(32);
  noStroke();
  textAlign(CENTER)
  text("TELEPORT", width/2,height/6);

  tail.update();
}

function mouseMoved(e){
  tail.x = mouseX;
  tail.y = mouseY;
}

function Part(r,lineWeight,speed,length){
  this.history = [];
  this.moveR = r;
  this.lineWeight = lineWeight;
  this.speed = speed;
  this.length = length;
}

Part.prototype.update = function(x,y) {
  var nX;
  var nY;

  nX = x + this.moveR*cos(radians(frameCount)*this.speed);
  nY = y + this.moveR*sin(radians(frameCount)*this.speed);
  this.history.push({x:nX,y:nY});
  if(this.length <= this.history.length)
    this.history.shift();

  this.draw();
};

Part.prototype.draw = function() {
  var l = this.history.length-1;
  for(var i = l; i>0;i--){
    strokeWeight(this.lineWeight/i+1);

    //normal
    stroke('#04756F');
    fill('#FF8C00');
    //teleport Effect
    var d = dist(this.history[i].x,this.history[i].y,this.history[i-1].x,this.history[i-1].y);
    if(d > 10){
      fill('#D90000');
      stroke(4,117,111,50);
      //smoth Front
      if(i>l-4)
        stroke(255,140,0,255/d+50);
      //smoth End
      if(i<4)
        stroke(255,45,0,255/d+50);
    }else{
    //front
    if(i>l-4)
      stroke('#FF8C00');
    //end
    if(i<4)
      stroke('#FF2D00');
    }
    line(this.history[i].x,this.history[i].y,this.history[i-1].x,this.history[i-1].y);
  }
};

function Tail(num, length){
  this.x =  width/2;
  this.y = height/2;
  this.parts = [];
  for(var i = 0; i<num;i++){
    var moveR = 10 + i * 5; //random(20,100);
    this.parts.push(new Part(moveR, map(moveR,10,80,2,1), map(moveR,10,80,5,3),length));
  }
}

Tail.prototype.update = function(){
  var l  = this.parts.length;
  for(var i = 0; i<l;i++){
    this.parts[i].update(this.x,this.y);
  }
}
