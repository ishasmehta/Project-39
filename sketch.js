var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver, restart;


function preload(){
  jumpSound = loadSound("assets/sounds/jump.wav")
  collidedSound = loadSound("assets/sounds/collided.wav")
  
  backgroundImg = loadImage("assets/backgroundImg.png")
  sunAnimation = loadImage("assets/sun.png");
  
  trex_running = loadAnimation("assets/trex_2.png","assets/trex_1.png","assets/trex_3.png");
  trex_collided = loadAnimation("assets/trex_collided.png");
  
  groundImage = loadImage("assets/ground.png");
  
  cloudImage = loadImage("assets/cloud.png");
  
  obstacle1 = loadImage("assets/obstacle1.png");
  obstacle2 = loadImage("assets/obstacle2.png");
  obstacle3 = loadImage("assets/obstacle3.png");
  obstacle4 = loadImage("assets/obstacle4.png");
  
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
}

function setup() {
  createCanvas(600, 300);
  
  sun = createSprite(10,100,10,10);
  sun.addAnimation("sun", sunAnimation);
  sun.scale = 0.1;

  cloud = createSprite(width-100,20,40,10);
  cloud.y = Math.round(random(10,120));
  cloud.addImage(cloudImage);
  cloud.scale = 0.5;

  
  
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider('circle',0,0,350)
  trex.scale = 0.08
  // trex.debug=true
  
  
  
  ground = createSprite(width,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2;

  obstacle = createSprite(width+50,height-95,40,10);
  obstacle.addImage(obstacle1);
  obstacle.scale = 0.5;

  invisibleGround = createSprite(width/2,height-10,ground.width,125);  
  invisibleGround.visible = false;
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false

  
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,trex.x + width/4,50);
  sun.x = trex.x + width/4;
  camera.position.x = trex.x;
  gameOver.x = trex.x;
  restart.x = trex.x;

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    trex.velocityX = 4;
    
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
      jumpSound.play( )
      trex.velocityY = -15;
       touches = [];
    }
    
    trex.velocityY = trex.velocityY + 0.8;
  
    if (trex.x > ground.width/2){
      trex.x = 50;
    }
  
    trex.collide(invisibleGround);
    
  
    if(obstacle.isTouching(trex)){
        collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.velocityX = 0;
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    
    
    if(touches.length>0 || mousePressedOver(restart)) {      
      reset();
      touches = [];
    }
  }
  
  
  drawSprites();
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  
  
  trex.changeAnimation("running",trex_running);
  trex.x = 50;
  
  score = 0;
  
}
