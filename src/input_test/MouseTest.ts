export class MouseTest extends Phaser.Scene {

    screenWidth: number;
    screenHeight: number;

    ship: Phaser.Physics.Arcade.Sprite;
    text: Phaser.GameObjects.Text;

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

    init(params: any): void {
        this.screenWidth = this.sys.game.scale.gameSize.width;
        this.screenHeight = this.sys.game.scale.gameSize.height;
    }

    preload(): void {
        this.load.atlas('spritesheet', 'assets/graphics/spritesheet.png', 'assets/graphics/spritesheet.json');
    }

    create(): void {

        this.text = this.add.text(10, 10, 'Press mouse button to enter pointer lock, q to exit pointer lock.', { font: '16px Courier', color: '#00ff00' });

        this.ship = this.physics.add.sprite(Phaser.Math.Between(200, 600), Phaser.Math.Between(100, 500), 'spritesheet', 'spaceship');

        let pointerLock: boolean = false;

        // Pointer lock will only work after an 'engagement gesture', e.g. mousedown, keypress, etc.
        this.input.on('pointerdown', function (pointer) {

            if (pointerLock) {
                let missile = this.physics.add.sprite(this.ship.x, this.ship.y, "spritesheet", "missile");
                missile.setVelocity(1000, 0);
            } else {
                this.input.mouse.requestPointerLock();
                pointerLock = true;
            }



        }, this);


        this.input.on('pointermove', function (pointer) {

            if (this.input.mouse.locked) {
                this.ship.x += pointer.movementX;
                this.ship.y += pointer.movementY;


                // Force the this.ship to stay on screen
                this.ship.x = Phaser.Math.Wrap(this.ship.x, 0, this.screenWidth);
                this.ship.y = Phaser.Math.Wrap(this.ship.y, 0, this.screenHeight);

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


    update(time: number, delta: number): void {

    }

}
