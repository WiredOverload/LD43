export class Explosion {
    x: number;
    y: number;
    height: number;
    width: number;
    draw: HTMLImageElement;
    timer: number;

    constructor(type: number, timer: number, x: number, y: number) {
        this.draw = new Image();
        this.timer = timer;
        switch(type){
            case 0: {
                this.height = 8;
                this.width = 8;
                this.draw.src = "assets/teleport.png";
                break;
            }
            case 1: {
                this.height = 8;
                this.width = 8;
                this.draw.src = "assets/smallHit.png";
                break;
            }
            case 2: {
                this.height = 32;
                this.width = 32;
                this.draw.src = "assets/mediumExplosion1.png";
                break;
            }
        }
        this.x = x;
        this.y = y;
    }

    update() : void {
        this.timer--;
    }

    render(context: CanvasRenderingContext2D) : void {
        context.drawImage(this.draw, this.x - (this.width / 2), this.y - (this.height / 2));
    }
}