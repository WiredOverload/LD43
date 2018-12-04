define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Explosion = /** @class */ (function () {
        function Explosion(type, timer, x, y) {
            this.draw = new Image();
            this.timer = timer;
            switch (type) {
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
        Explosion.prototype.update = function () {
            this.timer--;
        };
        Explosion.prototype.render = function (context) {
            context.drawImage(this.draw, this.x - (this.width / 2), this.y - (this.height / 2));
        };
        return Explosion;
    }());
    exports.Explosion = Explosion;
});
