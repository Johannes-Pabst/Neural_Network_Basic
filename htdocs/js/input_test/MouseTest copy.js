export class MouseTest extends Phaser.Scene {
    constructor() {
        super({
            key: "InputTest",
            // overrides default config set in new Phaser.Game(config)
            physics: {
                default: "arcade",
                arcade: {
                    debug: false
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
        this.text = this.add.text(10, 10, 'Press mouse button to enter pointer lock, q to exit pointer lock.', { font: '16px Courier', fill: '#00ff00' });
        this.ship = this.physics.add.sprite(Phaser.Math.Between(200, 600), Phaser.Math.Between(100, 500), 'spritesheet', 'spaceship');
        let pointerLock = false;
        // Pointer lock will only work after an 'engagement gesture', e.g. mousedown, keypress, etc.
        this.input.on('pointerdown', function (pointer) {
            if (!pointerLock) {
                this.input.mouse.requestPointerLock();
                pointerLock = true;
            }
            let missile = this.physics.add.sprite(this.ship.x, this.ship.y, "spritesheet", "missile");
            missile.setVelocity(1000, 0);
        }, this);
        this.input.on('pointermove', function (pointer) {
            if (this.input.mouse.locked) {
                this.ship.x += pointer.movementX;
                this.ship.y += pointer.movementY;
                // Force the this.ship to stay on screen
                this.ship.x = Phaser.Math.Wrap(this.ship.x, 0, this.screenWidth);
                this.ship.y = Phaser.Math.Wrap(this.ship.y, 0, this.screenHeight);
                if (pointer.movementX > 0) {
                    this.ship.setRotation(0.1);
                }
                else if (pointer.movementX < 0) {
                    this.ship.setRotation(-0.1);
                }
                else {
                    this.ship.setRotation(0);
                }
            }
        }, this);
        // Exit pointer lock when Q is pressed. Browsers will also exit pointer lock when escape is
        // pressed.
        this.input.keyboard.on('keydown-Q', function (event) {
            if (this.input.mouse.locked) {
                this.input.mouse.releasePointerLock();
            }
        }, this);
        let that = this;
        this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            that.text.setPosition(that.text.x + deltaX, that.text.y + deltaY);
        });
    }
    update(time, delta) {
    }
}
//# sourceMappingURL=MouseTest copy.js.map