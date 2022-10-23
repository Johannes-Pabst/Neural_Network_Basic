export class Rock extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, rocks) {
        super(scene, x, y, "rock");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // rocks.add(this);
        this.scale = 0.5;
        this.screenWidth = this.scene.sys.game.scale.gameSize.width;
        this.screenHeight = this.scene.sys.game.scale.gameSize.height;
        this.play("rotating_rock_" + Phaser.Math.Between(1, 2));
        this.body.setCircle(85, 50, 50);
        this.body.bounce.set(1);
        // You have to set velocity after adding to physics group. -> Bug?
        this.setVelocityX(Phaser.Math.Between(-120, -70));
        this.setVelocityY(Phaser.Math.Between(-30, 30));
        this.setAngularVelocity(Phaser.Math.Between(-30, 30));
        let that = this;
        this.updateFunction = () => {
            that.onUpdate();
        };
        this.scene.events.on("update", this.updateFunction);
    }
    onUpdate() {
        if (this.x < -50 || this.y < -50 || this.y > this.screenHeight + 50) {
            this.destroy();
        }
    }
    explode() {
        let explosion = this.scene.add.sprite(this.x, this.y, "").play("explosion");
        explosion.scale = 2.0;
        explosion.once('animationcomplete', () => {
            explosion.destroy();
        });
        this.destroy();
    }
    destroy() {
        this.scene.events.off("update", this.updateFunction);
        super.destroy();
    }
}
export class Rocks extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
        scene.anims.create({
            key: 'rotating_rock_1',
            frames: scene.anims.generateFrameNumbers('rock', { frames: Phaser.Utils.Array.NumberArray(0, 30) }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: 'rotating_rock_2',
            frames: scene.anims.generateFrameNumbers('rock', { frames: Phaser.Utils.Array.NumberArray(32, 62) }),
            frameRate: 8,
            repeat: -1
        });
    }
    spawn(x, y) {
        this.add(new Rock(this.scene, x, y, this));
    }
    destroyAllRocks() {
        this.getChildren().slice().forEach(rock => {
            rock.destroy();
        });
    }
}
//# sourceMappingURL=Rocks.js.map