import {FlyingRectangle} from './FlyingRectangle.js';

export class FlyingRectangleScene extends Phaser.Scene {

    rectangles: FlyingRectangle[] = [];

    constructor() {
        super({
            key: "MainScene"
        });
    }

    init(params: any): void {
        // TODO
    }

    preload(): void {
//        this.load.image('ship1', 'assets/graphics/ship1.png');
    }

    create(): void {

    }

    lastUpdate: number = 0;

    update(time: number, delta: number): void {
        if(time - this.lastUpdate > 50){
            this.lastUpdate = time;
            let fr: FlyingRectangle = new FlyingRectangle(this, 400, 500);
            this.rectangles.push(fr);
        }

        let width = this.sys.game.scale.gameSize.width;
        let height = this.sys.game.scale.gameSize.height;

        for(let i = 0; i < this.rectangles.length; i++){
            let fr: FlyingRectangle = this.rectangles[i];
            if(fr.isInsideScreen(width, height)){
                fr.update(delta);
            } else {
                this.rectangles.splice(i, 1);
                fr.destroy();
                i--;
            }
        }


    }


}
