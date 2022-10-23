export class SpritesheetTestScene extends Phaser.Scene {
    constructor() {
        super({
            key: "SpritesheetTest"
        });
    }
    init(params) {
        // TODO
    }
    preload() {
        this.load.atlas('spritesheet', 'assets/graphics/spritesheet.png', 'assets/graphics/spritesheet.json');
    }
    create() {
        this.anims.create({ key: 'explosion', frames: this.anims.generateFrameNames('spritesheet', { prefix: 'Explosion_1#', start: 0, end: 55, zeroPad: 0 }), repeat: -1 });
        this.add.sprite(300, 300, "spritesheet").play("explosion");
    }
    update(time, delta) {
    }
}
//# sourceMappingURL=SpritesheetTestScene.js.map