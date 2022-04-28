var skyImg, sky;
var kriptonitaImg, kriptonita, kriptonitaGroup;
var helicopteroImg, helicoptero, helicopteroGroup;
var supermanImg, superman;
var invisibleBlockGroup, invisibleBlock;
var laserGroup
var gameState = "play"


function preload(){
    skyImg = loadImage("sky.png");
    kriptonitaImg = loadImage("kriptonita.png");
    helicopteroImg = loadImage("helicoptero.png");
    supermanImg = loadImage("superman.png");
}

function setup() {
    createCanvas(600, 600);
    sky = createSprite(300,300);
    sky.addImage("sky",skyImg);
    sky.velocityY = 1;
  
    superman = createSprite(300,380);
    superman.addImage("superman",supermanImg);
    superman.scale = 0.1
  
    helicopteroGroup = new Group();
     kriptonitaGroup = new Group();
     laserGroup = new Group();
}

function draw() {
    background("blue");
 
    
    if (gameState === "play") {
        superman.velocityY = superman.velocityY+0.8;
      if(keyDown("space")){
        superman.velocityY = -10  
      }
      if(keyDown("right")){
        superman.x = superman.x+3
      }
      if(keyDown("left")){
        superman.x = superman.x-3
      }
      
      if(sky.y > 400){
        sky.y = height / 4.5
      }

     laserGroup.bounceOff(kriptonitaGroup,destroyinimigos)
     laserGroup.bounceOff(helicopteroGroup,destroyinimigos)

      drawSprites()
      showhelicopteros()
      SpawnKriptonitas()
      visaoLaser()
      if (superman.y >600 || 
        superman.collide(kriptonitaGroup) ||
        superman.collide(helicopteroGroup)) {
       gameState = "END" 
      }
    } else {
      textSize(40)
      fill("red")
      text("GAME OVER",180,300)
      
    }
    } 


    function destroyinimigos(laser,kriptonita){
      kriptonita.remove();
      laser.remove();
      

    }




function showhelicopteros(){
    if(frameCount % 180 === 0){
    
        helicoptero = createSprite(300,-50);
      helicoptero.addImage("helicoptero",helicopteroImg);
      superman.depth = helicoptero.depth
      superman.depth = superman.depth+1
      helicoptero.velocityY = 1
      helicoptero.x = random(125,480)
      helicoptero.lifetime = 800
      helicoptero.scale = 0.3
      helicopteroGroup.add(helicoptero)
    }
    }

    function SpawnKriptonitas(){
      if(frameCount % 90 === 0){
    
        kriptonita = createSprite(300,15)
        kriptonita.addImage("kriptonita",kriptonitaImg);
        kriptonita.x = random(125,480)
        kriptonita.velocityY = 1
        kriptonitaGroup.add(kriptonita)
        kriptonita.scale = 0.1
        kriptonita.lifetime = 800 
        }
    }


    function visaoLaser(){
      if(keyDown("up")){
        var laser  = createSprite(200,200,10,10);
        laser.shapeColor = "red";
        laser.velocityY = -10;
        laser.x = superman.x;
        laserGroup.add(laser);


      }
    }