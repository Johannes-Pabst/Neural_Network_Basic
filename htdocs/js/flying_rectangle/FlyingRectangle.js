export class FlyingRectangle {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 10 - 5;
        this.vy = -8 - Math.random() * 5;
        this.vAngle = Math.random() * 3 - 1.5;
        var rectangle = new Phaser.Geom.Rectangle(-10, -10, 20, 20);
        let color = Math.trunc(Math.random() * 0xffffff);
        this.graphics = scene.add.graphics({ fillStyle: { color: color } });
        this.graphics.fillRectShape(rectangle);
        this.graphics.setPosition(x, y);
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.graphics.setPosition(this.x, this.y);
    }
    update(time) {
        let dt = time / 50;
        this.vy += 0.1 * dt;
        this.move(this.vx * dt, this.vy * dt);
        this.graphics.angle += this.vAngle * dt;
    }
    destroy() {
        this.graphics.destroy();
    }
    isInsideScreen(width, height) {
        return this.x >= -100 && this.x <= width + 100 && this.y <= height;
    }
}
//# sourceMappingURL=FlyingRectangle.js.map