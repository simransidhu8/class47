var girlWithMaskImage, girl;
var dayBackground, nightBackground, parkImage, bg;
var sanitizerImage, sanitizer;
var virus, virusImage, table, tableImage;
var maskImage, mask;
var carImage, car;
var AlertSound;
var ground;
var gameOver, gameOverImage;

var gameState= "play";

function preload(){
  //girlImage= loadImage("girl.png");
  girlWithMaskImage= loadImage("images/girlMask.png");
  
  dayBackground= loadImage("images/day-background.jpg");
  nightBackground= loadImage("images/night-background.png");
  parkImage= loadImage("images/park.png");
  
  sanitizerImage= loadImage("images/sanitizer.png");
  virusImage= loadImage("images/virus.png");
  tableImage = loadImage("images/table.png");
  maskImage= loadImage("images/mask.png");
  carImage= loadImage("images/car.jpg");
  
  gameOverImage = loadImage("images/gameover.png");

  hospitalImage = loadImage("images/hospital.jpg");
  
  AlertSound= loadSound("Alert-Sound.wav");
}

function setup(){
  createCanvas(600, 500);
  
  bg= createSprite(0, 100);
  bg.addImage(nightBackground);
  bg.scale= 1.2;
  
  ground= createSprite(300, 320, 600, 20);
  
  
  girl= createSprite(50, 260);
  girl.addImage(girlWithMaskImage);
  girl.scale= 0.3;
  girl.debug= true;
  
  girl.setCollider("rectangle", 0, 0, 70, girl.height - 100);
  
  gameOver = createSprite(300, 300);
  gameOver.addImage(gameOverImage);
  
  virusGroup = new Group();
  sanitizerGroup= new Group();
  tableGroup= new Group();
}

function draw(){
  ground.visible = false;
  girl.collide(ground);
  
  if(gameState === "play"){
    gameOver.visible = false;
    
    bg.velocityX= -3;
    
    spawnVirus();
    spawnSanitizer();
    
    
    if(bg.x < 0){
    bg.x = bg.width/2;
    }
  
    if(keyDown(LEFT_ARROW)){
      girl.x -= 2;
    }
    
    if(keyDown(RIGHT_ARROW)){
      girl.x += 2;
    }
    
    if(keyDown("space")){
      girl.velocityY = -10; 
    }
    
    girl.velocityY = girl.velocityY + 0.5; 
    
    if(girl.isTouching(sanitizerGroup)){
      window.alert("Sanitize your hands");
      sanitizerGroup.destroyEach();
      tableGroup.destroyEach();
    }  
    
    if(girl.isTouching(virusGroup)){
      gameState = "end";
      AlertSound.play();
      window.alert("Tested Positive! Self-Isolate for 2 weeks!")
    }
  } else if(gameState === "end"){
      bg.velocityX = 0;
      //gameOver.visible= true;
      sanitizerGroup.setVelocityXEach(0);
      sanitizerGroup.setLifetimeEach(-1);
    
      tableGroup.setVelocityXEach(0);
      tableGroup.setLifetimeEach(-1);
    
      virusGroup.setVelocityXEach(0);
      virusGroup.setLifetimeEach(-1);

      hospitalButton =  createButton("Go to hospital");
      hospitalButton.position(500, 100);
      hospitalButton.mousePressed(changeBackground);
}
  drawSprites();
}

function changeBackground(){
  bg.addImage(hospitalImage);
  bg.x = 300;
  bg.y = 250;
  bg.scale= 1.7;
  bg.velocityX = 0;

  girl.y = 442;
  girl.x = 150;
  girl.scale= 0.25;

  sanitizerGroup.destroyEach();
  tableGroup.destroyEach();
  virusGroup.destroyEach();
}

function spawnVirus(){
  if(frameCount % 150 === 0){
    virus = createSprite(600, Math.round(random(200, 400)));
    virus.velocityX= -3;
    virus.addImage(virusImage);
    virus.scale= 0.1;
    virus.lifetime= 200;
    virusGroup.add(virus);
    
    virus.depth = girl.depth;
    girl.depth = girl.depth + 1;
  }
}

function spawnSanitizer(){
  if(frameCount % 300 === 0){
    table = createSprite(600, 300);
    sanitizer = createSprite(600, 260);
    
    table.addImage(tableImage);
    sanitizer.addImage(sanitizerImage);
    
    table.scale = 0.03;
    sanitizer.scale = 0.05;
    
    sanitizer.velocityX= -3;
    table.velocityX= -3;
    
    sanitizer.lifetime = 200;
    table.lifeitme = 200;
    
    table.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
    sanitizer.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
    sanitizerGroup.add(sanitizer);
    tableGroup.add(table);
  }
}
