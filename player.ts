export class Player {
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
    height: number;
    width: number;
    draw: HTMLImageElement;
    //drawBarrel: HTMLImageElement;
    drawBarrelList: HTMLImageElement[];
    charge: number;
    chargeSpeed: number;
    mouseX: number;
    mouseY: number;
    angle: number;

    constructor() {
        this.x = 512;
        this.y = 256;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.height = 48;
        this.width = 48;
        this.charge = 0;
        this.chargeSpeed = 30;
        this.mouseX = 0;
        this.mouseY = 0;
        this.angle = 0;

        this.draw = new Image();
        this.draw.src = "assets/base2.png";
        
        this.drawBarrelList = [];
        for(var i = 0; i < 4; i++) {
            this.drawBarrelList.push(new Image());
            this.drawBarrelList[i].src = "assets/barrelRotated" + i + ".png";
        }
    }

    update(): void {
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        if(this.x < 0 + (this.width / 2) || this.x > 1024 - (this.width / 2)) {
            this.xVelocity = -(this.xVelocity) + (this.xVelocity / 3);
            this.x += this.xVelocity;//extra move to not get stuck in walls
            this.y += this.yVelocity;
        }
        if(this.y < 0 + (this.height / 2) || this.y > 512 - (this.height / 2)) {
            this.yVelocity = -(this.yVelocity) + (this.yVelocity / 3)
            this.x += this.xVelocity;
            this.y += this.yVelocity;
        }

        if(this.charge > 0 && this.charge < this.chargeSpeed * 3) {
            this.charge++;
        }

        this.angle = Math.atan2(this.mouseY - this.y, this.mouseX - this.x);
    }

    render(context: CanvasRenderingContext2D): void {
        //context.drawImage(this.draw, -this.width/2, -this.height/2);
        context.drawImage(this.draw, this.x - (this.width / 2), this.y - (this.height / 2));

        context.translate(this.x, this.y);
        context.rotate(this.angle + Math.PI/2);
        context.drawImage(this.drawBarrelList[Math.floor(this.charge / 30)], -8, -24);
        context.rotate(-(this.angle + Math.PI/2));
        context.translate(-this.x, -this.y);
    }
}