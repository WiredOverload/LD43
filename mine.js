define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Mine = /** @class */ (function () {
        function Mine() {
            this.height = 16;
            this.width = 16;
            this.draw = new Image();
            this.draw.src = "assets/Wall1.png";
            var direction = Math.floor(Math.random() * 4); //clockwise spawn direction
            switch (direction) {
                case 0: {
                    this.x = Math.floor(Math.random() * 1024);
                    this.y = -this.height / 2;
                    this.xVelocity = (Math.random() * 2) - 1; //magic numbers
                    this.yVelocity = Math.random() * 2;
                    break;
                }
                case 1: {
                    this.x = 1024 + this.width / 2;
                    this.y = Math.floor(Math.random() * 512);
                    this.xVelocity = -(Math.random() * 2);
                    this.yVelocity = (Math.random() * 2) - 1;
                    break;
                }
                case 2: {
                    this.x = Math.floor(Math.random() * 1024);
                    this.y = 512 + this.height / 2;
                    this.xVelocity = (Math.random() * 2) - 1;
                    this.yVelocity = -(Math.random() * 2);
                    break;
                }
                case 3: {
                    this.x = -this.width / 2;
                    this.y = Math.floor(Math.random() * 512);
                    this.xVelocity = Math.random() * 2;
                    this.yVelocity = (Math.random() * 2) - 1;
                    break;
                }
            }
        }
        Mine.prototype.update = function () {
            this.x += this.xVelocity;
            this.y += this.yVelocity;
        };
        Mine.prototype.render = function (context) {
            //context.drawImage(this.draw, -this.width/2, -this.height/2);
            context.drawImage(this.draw, this.x - (this.width / 2), this.y - (this.height / 2));
        };
        return Mine;
    }());
    exports.Mine = Mine;
});
