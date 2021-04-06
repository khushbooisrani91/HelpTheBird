var sky,bird,cliff1,coin,play,end,play;
var invisibleGround,cliff1Group,coinGroup,monster,monsterGroup;
var tree,cliff,grass1,grass2,bird2;
var Score=0;
var gameState = "start";

function preload(){
  
  skyImg = loadImage("bg-1.jpg")
  birdAni = loadAnimation("bird1.png","bird2.png")
  cliffImg = loadImage("grass.png")
  coinImg = loadImage("coin.png")
  startImg = loadImage("startbutton.png")
  monsterImg = loadImage("monster.png")
  treeImg = loadImage("tree.png")
  grassImg = loadImage("grass2.png")
  birdImg = loadImage("bird1.png")
  
  
}
function setup() {
  
  createCanvas(600, 500);
  
  cliff1Group=new Group();
  coinGroup=new Group();
  monsterGroup=new Group();

  
  
  sky = createSprite(300,220)
  sky.addImage("tower",skyImg);
  sky.scale=0.9;
  //sky.velocityY=1;
  
  invisibleGround = createSprite(50,480,40,20)
  invisibleGround.visible=false;
  
  bird = createSprite(50,450,50,50);
  bird.addAnimation("wnef",birdAni)
  bird.scale=0.5
  //bird.debug=true;
  bird.setCollider("rectangle",0,0,40,70);
   play = createSprite(300,400,10,10)
  play.addImage("bh",startImg) 
  
}

function draw() {
  
  
  
  if(gameState === "start"){
  background(skyImg)
 stroke("white");
    fill("black");
    textSize(50)
    text("Reach Score 20 to Win",50,50);
    
    stroke("white");
    fill("black");
    textSize(30)
    text("After score 10 birds will start to spawn",50,100);
    
    stroke("white");
    fill("black");
    textSize(30)
    text("You lose if you collide with the birds",70,140);
    
    stroke("white");
    fill("black");
    textSize(30)
    text("Collect coins to increase your score",70,180);
    
    
    
    stroke("white");
    fill("black");
    textSize(30)
    text(" You can sit on GrassBlocks for help.",60,220);
    
    stroke("white");
    fill("white");
    textSize(30)
    text("Controls - right arrow, left arrow, space bar.",25,260);
    
    
    
  play.visible=true;
  bird.visible=false;
  sky.visible=false;    
   
  
  if(mousePressedOver(play)){
     
      gameState = "play";
    }
  }
    if(gameState === "play"){
      background(skyImg)
      play.destroy();
      bird.visible=true;
      sky.visible=false;
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+Score,250,50);
    
    
    if(keyDown("left_arrow")){
    bird.x-=3;
  }
  
  if(keyDown("right_arrow")){
    bird.x+=3;
  }
  
  if(keyDown("space")){
    bird.velocityY=-4;
  }
   
    bird.velocityY+=0.5;
    bird.collide(invisibleGround);
    bird.collide(cliff1Group);
  
   if (bird.isTouching(coinGroup)){
  coinGroup.destroyEach();
    Score=Score+1;}
  spawnCoins();
  spawndoors();
      
  if(Score===10){
    
    if (frameCount%200=== 0){
    moster=createSprite(150,-50);
    moster.addImage("door",monsterImg);
    moster.scale=0.2 
    moster.x=Math.round(random(50,500));
    moster.velocityY=1;
    monsterGroup.add(moster);
  }
    
    
  }
    
  
  if(bird.y>500||bird.y<0||bird.x>600||bird.x<0||monsterGroup.isTouching(bird)){
    bird.destroy();
    coinGroup.destroyEach();
    monsterGroup.destroyEach();
    cliff1Group.destroyEach();
    gameState="end";
  }
      if(Score===20){
        bird.destroy();
    coinGroup.destroyEach();
    cliff1Group.destroyEach();
    monsterGroup.destroyEach();
        gameState="win"
      
      }
    }

  if(gameState === "end"){
    sky.visible=false;
    
    background(skyImg)
    stroke("yellow");
    fill("black");
    textSize(80)
    text("GAME OVER",65,250);
    
    
    }
  
  
  if(gameState === "win"){
    background(skyImg)
    stroke("white");
    fill("black");
    textSize(60)
    text("YOU WIN",150,100);
    
    stroke("white");
    fill("magenta");
    textSize(30)
    text("You  Helped The Bird",300,150);
    stroke("white");
    fill("magenta");
    textSize(30)
    text("Reach The Tree",330,200);
    sky.visible=false;
    
    cliff = createSprite(250,400,10,10);
    cliff.addImage("fh",cliffImg);
    
    tree = createSprite(180,250,10,10);
    tree.addImage(treeImg)
    tree.scale=0.6
    
    grass1 = createSprite(310,310,10,10)
    grass1.addImage(grassImg)
    grass1.scale=0.2
    
    bird2 = createSprite(230,330,10,10)
    bird2.addImage(birdImg)
    bird2.scale=0.6
    
    bird.visible=false
    
 }
  
  
  
   drawSprites();
}  
  



function spawndoors(){
  
  if (frameCount%200=== 0){
    cliff1=createSprite(150,-50);
    cliff1.addImage("door",cliffImg);
    cliff1.scale=0.5  
    cliff1.x=Math.round(random(50,550));
    cliff1.velocityY=1;
    cliff1Group.add(cliff1);
    
   
    
    

  }
}
function spawnCoins(){
  
  if (frameCount%300=== 0){
    coin=createSprite(150,-50);
    coin.addImage("door",coinImg);
    coin.scale=1  
    coin.x=Math.round(random(50,500));
    coin.velocityY=1;
    coinGroup.add(coin);
  }
}

