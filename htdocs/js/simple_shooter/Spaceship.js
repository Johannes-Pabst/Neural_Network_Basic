import { SpaceshipBullets } from "./SpaceshipBullets.js";
export class Spaceship extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 300, 300, "spritesheet", "spaceship");
        this.speed = 5;
        this.lastFired = 0;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.bullets = new SpaceshipBullets(scene, this);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.screenWidth = this.scene.sys.game.scale.gameSize.width;
        this.screenHeight = this.scene.sys.game.scale.gameSize.height;
        this.body.bounce.set(0);
        let that = this;
        this.scene.events.on('update', (time, delta) => {
            that.update(time, delta);
        });
    }
    hide() {
        this.visible = false;
        this.body.enable = false;
    }
    show() {
        this.body.reset(100, this.screenHeight / 2);
        this.visible = true;
        this.body.enable = true;
    }
    update(time, delta) {
        let dx = 0;
        let dy = 0;
        if (this.cursors.left.isDown) {
            dx -= 1;
        }
        if (this.cursors.right.isDown) {
            dx += 1;
        }
        if (this.cursors.up.isDown) {
            dy -= 1;
        }
        if (this.cursors.down.isDown) {
            dy += 1;
        }
        if (dx !== 0 || dy !== 0) {
            let d = Math.sqrt(dx * dx + dy * dy);
            dx /= d;
            dy /= d;
            dx *= this.speed;
            dy *= this.speed;
            let newX = Phaser.Math.Clamp(this.x + dx, this.width / 2, this.screenWidth / 2);
            let newY = Phaser.Math.Clamp(this.y + dy, this.height / 2, this.screenHeight - this.height / 2);
            this.setPosition(newX, newY);
        }
        if (this.spaceKey.isDown && time - this.lastFired > 400 && this.visible) {
            this.bullets.fire();
            this.lastFired = time;
        }
    }
}
//# sourceMappingURL=Spaceship.js.map