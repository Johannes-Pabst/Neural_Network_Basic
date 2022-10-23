import { FlyingRectangle } from './FlyingRectangle.js';
export class FlyingRectangleScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
        this.rectangles = [];
        this.lastUpdate = 0;
    }
    init(params) {
        // TODO
    }
    preload() {
        //        this.load.image('ship1', 'assets/graphics/ship1.png');
    }
    create() {
    }
    update(time, delta) {
        if (time - this.lastUpdate > 50) {
            this.lastUpdate = time;
            let fr = new FlyingRectangle(this, 400, 500);
            this.rectangles.push(fr);
        }
        let width = this.sys.game.scale.gameSize.width;
        let height = this.sys.game.scale.gameSize.height;
        for (let i = 0; i < this.rectangles.length; i++) {
            let fr = this.rectangles[i];
            if (fr.isInsideScreen(width, height)) {
                fr.update(delta);
            }
            else {
                this.rectangles.splice(i, 1);
                fr.destroy();
                i--;
            }
        }
    }
}
//# sourceMappingURL=FlyingRectangleScene.js.map