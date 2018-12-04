define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Astronaut = /** @class */ (function () {
        function Astronaut(x, y, xVelocity, yVelocity) {
            this.x = x;
            if (this.x == null) {
                this.x = 32;
            }
            this.y = y;
            if (this.y == null) {
                this.y = 32;
            }
            this.xVelocity = xVelocity;
            if (this.xVelocity == null) {
                this.xVelocity = 0;
            }
            this.yVelocity = yVelocity;
            if (this.yVelocity == null) {
                this.yVelocity = 0;
            }
            this.height = 8;
            this.width = 8;
            this.teleportTimer = 180;
            this.drawList = [];
            for (var i = 0; i < 4; i++) {
                this.drawList.push(new Image());
                this.drawList[i].src = "assets/astro" + (i + 1) + ".png";
            }
            //this.draw = new Image();
            //this.draw.src = "assets/astro1.png";
        }
        Astronaut.prototype.update = function () {
            this.x += this.xVelocity;
            this.y += this.yVelocity;
            this.teleportTimer--;
            if (this.x < 0 + (this.width / 2) || this.x > 1024 - (this.width / 2)) {
                this.xVelocity = -(this.xVelocity) + (this.xVelocity / 3);
                this.x += this.xVelocity; //extra move to not get stuck in walls
                this.y += this.yVelocity;
            }
            if (this.y < 0 + (this.height / 2) || this.y > 512 - (this.height / 2)) {
                this.yVelocity = -(this.yVelocity) + (this.yVelocity / 3);
                this.x += this.xVelocity;
                this.y += this.yVelocity;
            }
        };
        Astronaut.prototype.render = function (context) {
            //context.drawImage(this.draw, -this.width/2, -this.height/2);
            context.drawImage(this.drawList[Math.floor(Math.random() * 4)], this.x - (this.width / 2), this.y - (this.height / 2));
        };
        return Astronaut;
    }());
    exports.Astronaut = Astronaut;
});
