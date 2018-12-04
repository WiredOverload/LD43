export class Debris {
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
    height: number;
    width: number;
    draw: HTMLImageElement;
    timer: number;

    constructor(type: number, timer: number, x: number, y: number) {
        this.timer = timer;
        this.x = x;
        this.y = y;
        this.xVelocity = (Math.random() * 4) - 2;
        this.yVelocity = (Math.random() * 4) - 2;
        this.draw = new Image();

        switch(type){
            case 0: {
                this.height = 4;
                this.width = 4;
                this.draw.src = "assets/astroDebri1.png";
                break;
            }
            case 1: {
                this.height = 2;
                this.width = 3;
                this.draw.src = "assets/astroDebri2.png";
                break;
            }
            case 2: {
                this.height = 2;
                this.width = 3;
                this.draw.src = "assets/astroDebri3.png";
                break;
            }
            case 3: {
                this.height = 2;
                this.width = 3;
                this.draw.src = "assets/astroDebri4.png";
                break;
            }
            case 4: {
                this.height = 2;
                this.width = 3;
                this.draw.src = "assets/astroDebri5.png";
                break;
            }
        }
    }

    update() : void {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.timer--;
    }

    render(context: CanvasRenderingContext2D) : void {
        context.drawImage(this.draw, this.x - (this.width / 2), this.y - (this.height / 2));
    }
}