export class SpaceshipBullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet", "missile");
        this.screenWidth = this.scene.sys.game.scale.gameSize.width;
        this.setActive(false);
        this.setVisible(false);
        scene.add.existing(this);
    }
    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
        this.setVelocityX(1000);
        let that = this;
        this.updateFunction = () => {
            that.onUpdate();
        };
        this.scene.events.on("update", this.updateFunction);
    }
    onUpdate() {
        if (this.x > this.screenWidth + 100) {
            this.destroy();
        }
    }
    destroy() {
        if (!this.active)
            return;
        this.setActive(false);
        this.setVisible(false);
        this.body.enable = false;
        this.scene.events.off("update", this.updateFunction);
    }
}
export class SpaceshipBullets extends Phaser.Physics.Arcade.Group {
    constructor(scene, spaceship) {
        super(scene.physics.world, scene);
        this.spaceship = spaceship;
        for (let i = 0; i < 50; i++) {
            let bullet = new SpaceshipBullet(scene, 0, 1000);
            this.add(bullet);
        }
    }
    fire() {
        let bullet = this.getFirstDead(false);
        if (bullet) {
            bullet.fire(this.spaceship.x + 5, this.spaceship.y + 12);
        }
    }
}
//# sourceMappingURL=SpaceshipBullets.js.map