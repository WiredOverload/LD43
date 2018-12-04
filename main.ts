/* 
TODO List:
Implement second obstacle type
*/

var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("imgCanvas");
var context:CanvasRenderingContext2D = canvas.getContext("2d");

import { Player } from "./Player";
import { Astronaut } from "./astronaut";
import { Mine } from "./mine";
import { Explosion } from "./explosion";
import { Debris } from "./debris";

var player:Player = new Player();
var mineList:Mine[] = [];
var astroList:Astronaut[] = [];
var explosionList:Explosion[] = [];
var debrisList:Debris[] = [];

var isGameStarted:boolean = false;
var tick:number = 0;
var highScore:number = 0;
var interval;
var gameSpeed:number = 60; //how many times mainloop is called per second
var mouseX:number = 0;
var mouseY:number = 0;
var rect = <ClientRect | DOMRect> null; //needed for mousePos
var mineTimer: number = 0; //countdown till more mines spawn
var mineTimerStart: number = 60 * 16; //minetimer at start
var astroTotal: number = 10;//total number of astronauts left
var music:HTMLAudioElement = new Audio("assets/newtonSong.wav");
music.volume = 0.7;
var shootSound:HTMLAudioElement = new Audio("./assets/slink.mp3");
shootSound.volume = 1.0;
var explodeSound:HTMLAudioElement = new Audio("./assets/Explosion14.wav");
explodeSound.volume = 0.7;
var teleportSound:HTMLAudioElement = new Audio("./assets/shoot.wav");
teleportSound.volume = 0.5;

var BreakException = {};//hack to get a break in a typescript forEach

var splashScreen: HTMLImageElement = new Image();
splashScreen.src = "assets/newtonsplash2.png";
var astroImage: HTMLImageElement = new Image();
astroImage.src = "assets/astro1.png";
var stars: HTMLImageElement = new Image();
stars.src = "assets/space4096.png";
var cloud1: HTMLImageElement = new Image();//tick controls clouds right now
cloud1.src = "assets/thinClouds1.png";
var cloud2: HTMLImageElement = new Image();
cloud2.src = "assets/thinClouds1.png";
var cloud3: HTMLImageElement = new Image();
cloud3.src = "assets/thinClouds2.png";
var cloud4: HTMLImageElement = new Image();
cloud4.src = "assets/thinClouds2.png";


function render() : void {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(stars, 0, 0);
    context.drawImage(cloud1, tick % cloud1.width, 0);
    context.drawImage(cloud2, (tick % cloud1.width) - cloud1.width, 0);
    context.drawImage(cloud3, (tick * 2) % cloud1.width, 0);
    context.drawImage(cloud4, ((tick * 2) % cloud1.width) - cloud3.width, 0);
    
    //entity render here
    player.render(context);

    mineList.forEach(mine => {
        mine.render(context);
    });

    astroList.forEach(astronaut => {
        astronaut.render(context);
    });

    for(var i:number = 0; i < astroTotal; i++) {
        context.drawImage(astroImage, 8 + (i * 16), 8);
    }

    explosionList.forEach(explosion => {
        explosion.render(context);
    });

    debrisList.forEach(debris => {
        debris.render(context);
    });

    if(!isGameStarted) {
        context.drawImage(splashScreen, 0, 0);
    }

    window.requestAnimationFrame(render);
}

render();

function mainLoop() : void {
    tick++;
    mineTimer--;

    document.getElementById("TICKS").innerHTML = "Score: " + tick;

    //updates
    player.update();

    astroList.forEach((astronaut, index) => {
        astronaut.update();
        if(astronaut.teleportTimer < 1) {
            teleportSound.play();
            explosionList.push(new Explosion(0, 20, astronaut.x, astronaut.y));
            astroList.splice(index, 1);
        }
    });

    mineList.forEach((mine, index) => {
        if(mine.x < -mine.width || mine.x > canvas.width + mine.width || mine.y < -mine.height || mine.y > canvas.height + mine.height) {
            mineList.splice(index, 1);
        }
        mine.update();
    });

    explosionList.forEach((explosion, index) => {
        explosion.update();
        if(explosion.timer < 1) {
            explosionList.splice(index, 1);
        }
    });

    debrisList.forEach((debris, index) => {
        debris.update();
        if(debris.timer < 1) {
            debrisList.splice(index, 1);
        }
    });

    //mine spawn logic
    if(mineTimer < 1) {
        mineList.push(new Mine())
        mineTimerStart--;
        mineTimer = Math.max(mineTimerStart, 15);//change this number to limit max spawn rate
    }

    //collision, should probably move this
    mineList.forEach((mine, index1) => {
        try{
        astroList.forEach((astro, index2) => {
            if(astro.x > mine.x - (mine.width / 2) && astro.x < mine.x + (mine.width / 2) && astro.y > mine.y - (mine.height / 2) && astro.y < mine.y + (mine.height / 2)) {
                explodeSound.play();
                explosionList.push(new Explosion(1, 20, mine.x, mine.y));
                for(var i:number = 0; i < 5; i++) {
                    debrisList.push(new Debris(i, 60, mine.x, mine.y));
                }
                astroList.splice(index2, 1);
                mineList.splice(index1, 1);
                astroTotal--;
                if(astroTotal < 1) {
                    death();
                }
                //tick -= 100;
                throw BreakException;
            }
        });

        //super unoptimized, but whatever, if it gets laggy this can be reduced by 4x
        if(mine.x - (mine.width / 2) > player.x - (player.width / 2) && mine.x - (mine.width / 2) < player.x + (player.width / 2) &&
             mine.y - (mine.height / 2) > player.y - (player.height / 2) && mine.y - (mine.height / 2)< player.y + (player.height / 2) ||
             mine.x + (mine.width / 2) > player.x - (player.width / 2) && mine.x + (mine.width / 2) < player.x + (player.width / 2) &&
             mine.y - (mine.height / 2) > player.y - (player.height / 2) && mine.y - (mine.height / 2)< player.y + (player.height / 2) ||
             mine.x + (mine.width / 2) > player.x - (player.width / 2) && mine.x + (mine.width / 2) < player.x + (player.width / 2) &&
             mine.y + (mine.height / 2) > player.y - (player.height / 2) && mine.y + (mine.height / 2)< player.y + (player.height / 2) ||
             mine.x - (mine.width / 2) > player.x - (player.width / 2) && mine.x - (mine.width / 2) < player.x + (player.width / 2) &&
             mine.y + (mine.height / 2) > player.y - (player.height / 2) && mine.y + (mine.height / 2)< player.y + (player.height / 2)) {
            explosionList.push(new Explosion(2, 5, player.x, player.y));
            death();
        }

        } catch(e) {
            if (e !== BreakException) {
                throw e;
            }
        }
    });

}

function setCanvasClickEvent() {
    canvas.onmousedown = function() {
        if(!isGameStarted) {
            isGameStarted = true;
            reset();
        }
        else {
            player.charge = 1;
        }
        return false;
    }
    canvas.onmouseup = function() {//look out for problems here
        if(player.charge > 0) {
            if(astroTotal > astroList.length) {
                shootSound.play();
                var angle:number = Math.atan2(mouseY - player.y, mouseX - player.x);
                astroList.push(new Astronaut(player.x, player.y, Math.cos(angle) * (player.charge / 10), Math.sin(angle) * (player.charge / 10)));//magic numbers here for balance 10
                player.xVelocity -= Math.cos(angle) * (player.charge / 20);//20
                player.yVelocity -= Math.sin(angle) * (player.charge / 20);
            }
            player.charge = 0;
        }
    }
}

setCanvasClickEvent();

function reset() : void {
    tick = 0;
    mineTimer = 60;
    mineTimerStart = 60;
    astroTotal = 10;
    player = new Player();
    mineList = [];
    astroList = [];
    explosionList = [];
    debrisList = [];
    music.play();
    //music.volume = 0.7;
    music.loop = true;
    interval = setInterval(mainLoop, 1000 / gameSpeed);
}

function death() : void {
    if(tick > highScore) {
        highScore = tick;
    }

    document.getElementById("TICKS").innerHTML = "GAME OVER, Your score was: " + tick + ", Highscore is: " + highScore + " (Click to retry)";
    isGameStarted = false;
    render();
    canvas.onmousedown = null;
    window.clearInterval(interval);
    setTimeout(function() {
        setCanvasClickEvent();
    }, 250);
}

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) : void {
    rect = canvas.getBoundingClientRect();
    mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    player.mouseX = mouseX;
    player.mouseY = mouseY;
}

canvas.addEventListener('mousemove', function(evt: MouseEvent) {
    getMousePos(canvas, evt);
}, false);