export class AccelerationTest extends Phaser.Scene {
    constructor() {
        super({
            key: "InputTest",
            // overrides default config set in new Phaser.Game(config)
            physics: {
                default: "arcade",
                arcade: {
                    debug: false,
                    // gravity: new Phaser.Math.Vector2(0, 600)
                }
            }
        });
    }
    init(params) {
        this.screenWidth = this.sys.game.scale.gameSize.width;
        this.screenHeight = this.sys.game.scale.gameSize.height;
    }
    preload() {
        this.load.atlas('spritesheet', 'assets/graphics/spritesheet.png', 'assets/graphics/spritesheet.json');
    }
    create() {
        this.ship = this.physics.add.sprite(50, 300, 'spritesheet', 'spaceship');
        // this.ship.setAccelerationY(-600);
        this.input.on('pointerdown', function (pointer) {
            let missile = this.physics.add.sprite(this.ship.x, this.ship.y, "spritesheet", "missile");
            missile.setVelocity(1000, 0);
            missile.setAccelerationY(600);
            missile.setAngularVelocity(10);
        }, this);
    }
    update(time, delta) {
    }
}
//# sourceMappingURL=AccelerationTest.js.map