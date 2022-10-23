export class GamepadTest extends Phaser.Scene {

    screenWidth: number;
    screenHeight: number;

    ships: Phaser.Physics.Arcade.Sprite[] = [];

    textA: Phaser.GameObjects.Text[] = [];

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

        for(let i = 0; i < 4; i++){
            this.textA.push(this.add.text(10, 30 + 20*i, 'A' + i + ': '));
        }

        if (this.input.gamepad.total === 0) {
            let text: Phaser.GameObjects.Text = this.add.text(10, 10, 'Press any button on a connected Gamepad', { font: '16px Courier', color: '#00ff00' });

            this.input.gamepad.once('connected', function (pad) {

                console.log('connected', pad.id);

                for (var i = 0; i < this.input.gamepad.total; i++) {
                    this.ships.push(this.physics.add.sprite(Phaser.Math.Between(200, 600), Phaser.Math.Between(100, 500), 'spritesheet', 'spaceship'));
                }

                text.destroy();

            }, this);
        } else {
            for (var i = 0; i < this.input.gamepad.total; i++) {
                this.ships.push(this.physics.add.sprite(Phaser.Math.Between(200, 600), Phaser.Math.Between(100, 500), 'spritesheet', 'spaceship'));
            }
        }

    }


    update(time: number, delta: number): void {
        var pads = this.input.gamepad.gamepads;

        for (var i = 0; i < pads.length; i++)
        {
            var gamepad = pads[i];
    
            if (!gamepad)
            {
                continue;
            }
    
            let ship = this.ships[i];
    
            if (gamepad.left)
            {
                ship.x -= 4;
                ship.flipX = true;
            }
            else if (gamepad.right)
            {
                ship.x += 4;
                ship.flipX = false;
            }
    
            if (gamepad.up)
            {
                ship.y -= 4;
            }
            else if (gamepad.down)
            {
                ship.y += 4;
            }


            if(gamepad.A){
                let missile = this.physics.add.sprite(ship.x, ship.y, "spritesheet", "missile");
                missile.flipX = ship.flipX;
                missile.setVelocity(1000 * (ship.flipX ? -1 : 1), 0);
            }


            for(let i = 0; i < 4; i++){
                this.textA[i].text = 'A' + i + ': ' + gamepad.axes[i].value.valueOf();
            }

        }
    

    }

}
