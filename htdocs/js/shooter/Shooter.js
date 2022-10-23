import { Rocks } from "./Rock.js";
import { SpaceshipN } from "./SpaceshipN.js";
export class Shooter extends Phaser.Scene {
    constructor() {
        super({
            key: "Shooter"
        });
    }
    preload() {
        this.load.atlas('spritesheet', 'assets/graphics/spritesheet.png', 'assets/graphics/spritesheet.json');
        this.load.spritesheet('rock', 'assets/graphics/rocks_rotated.png', { frameWidth: 2048 / 8, frameHeight: 2048 / 8 });
    }
    // vor preload!
    init() {
        this.screenWidth = this.sys.game.scale.gameSize.width;
        this.screenHeight = this.sys.game.scale.gameSize.height;
    }
    // nach preload!
    create() {
        this.spaceship = new SpaceshipN(this);
        this.anims.create({ key: 'explosion', frames: this.anims.generateFrameNames('spritesheet', { prefix: 'Explosion_1#', start: 0, end: 55, zeroPad: 0 }), repeat: 0 });
        this.rocks = new Rocks(this);
        // Dieser Collider wird benötigt, damit die Felsen aneinander abprallen:
        this.physics.add.collider(this.rocks, this.rocks);
    }
    update(time, delta) {
        if (Math.random() < 0.02) {
            this.rocks.spawn(this.screenWidth + 50, Phaser.Math.Between(0, this.screenHeight));
            //this.children.bringToTop(this.bigText);
            //this.children.bringToTop(this.pressSText);
        }
    }
}
//# sourceMappingURL=Shooter.js.map