
export class FlyingRectangle {
    
    graphics: Phaser.GameObjects.Graphics;
    vx: number = Math.random() * 10 - 5;
    vy: number = -8 - Math.random() * 5;
    vAngle: number = Math.random()*3 - 1.5;

    constructor(private scene: Phaser.Scene, private x: number, private y: number){

        var rectangle = new Phaser.Geom.Rectangle(-10, -10, 20, 20);
        let color = Math.trunc(Math.random()*0xffffff);
        this.graphics = scene.add.graphics({ fillStyle: { color: color } });
        this.graphics.fillRectShape(rectangle);
        this.graphics.setPosition(x, y);

    }

    move(dx: number, dy: number){
        this.x += dx;
        this.y += dy;
        this.graphics.setPosition(this.x, this.y);
    }

    update(time: number){
        let dt = time/50;
        this.vy += 0.1 * dt;
        this.move(this.vx * dt, this.vy * dt );

        this.graphics.angle += this.vAngle * dt;
    }

    destroy(){
        this.graphics.destroy();
    }

    isInsideScreen(width: number, height: number){
        return this.x >= -100 && this.x <= width + 100 && this.y <= height;
    }

}