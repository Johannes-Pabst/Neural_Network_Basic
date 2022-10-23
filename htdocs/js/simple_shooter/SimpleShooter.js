import { Display } from "./Display.js";
import { MovingStars } from "./MovingStars.js";
import { Rocks } from "./Rocks.js";
import { Spaceship } from "./Spaceship.js";
export class SimpleShooter extends Phaser.Scene {
    constructor() {
        super({
            key: "SimpleShooter",
            // overrides default config set in new Phaser.Game(config)
            physics: {
                default: "arcade",
                arcade: {
                    debug: true
                }
            }
        });
        this.state = "splashscreen";
    }
    init(params) {
        this.screenWidth = this.sys.game.scale.gameSize.width;
        this.screenHeight = this.sys.game.scale.gameSize.height;
    }
    preload() {
        this.load.atlas('spritesheet', 'assets/graphics/spritesheet.png', 'assets/graphics/spritesheet.json');
        this.load.spritesheet('rock', 'assets/graphics/rocks_rotated.png', { frameWidth: 2048 / 8, frameHeight: 2048 / 8 });
    }
    create() {
        this.anims.create({ key: 'explosion', frames: this.anims.generateFrameNames('spritesheet', { prefix: 'Explosion_1#', start: 0, end: 55, zeroPad: 0 }), repeat: 0 });
        this.movingStars = new MovingStars(this, 50, 4, [1, 2, 3, 3.5]);
        this.spaceship = new Spaceship(this);
        this.rocks = new Rocks(this);
        this.display = new Display(this);
        this.bigText = this.add.text(this.screenWidth / 2, this.screenHeight / 2, "", { fontFamily: 'Arial', fontSize: '64px', color: '#2020ff' });
        this.bigText.setOrigin(0.5);
        this.bigText.setShadow(2, 2, "#8080ff", 2, false, true);
        this.pressSText = this.add.text(this.screenWidth / 2, this.screenHeight / 2 + 50, "Press s to start...", { fontFamily: 'Arial', fontSize: '32px', color: '#2020ff' });
        this.pressSText.setOrigin(0.5);
        this.pressSText.setShadow(2, 2, "#8080ff", 2, false, true);
        this.text = this.add.group([this.bigText, this.pressSText]);
        this.physics.add.collider(this.rocks, this.rocks);
        this.physics.add.collider(this.rocks, this.spaceship.bullets, (rock, bullet) => {
            rock.explode();
            bullet.destroy();
            this.display.score += 20;
            this.display.update();
        });
        this.physics.add.collider(this.rocks, this.spaceship, (rock, ship) => {
            rock.explode();
            this.display.lives--;
            this.display.update();
            if (this.display.lives == 0) {
                this.setState("gameover");
            }
        });
        this.setState("splashscreen");
        let sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        sKey.on("down", () => {
            switch (this.state) {
                case "gameover":
                    this.setState("playing");
                    break;
                case "splashscreen":
                    this.setState("playing");
                    break;
            }
        });
    }
    update(time, delta) {
        if (Math.random() < 0.02) {
            this.rocks.spawn(this.screenWidth + 50, Phaser.Math.Between(0, this.screenHeight));
            this.children.bringToTop(this.bigText);
            this.children.bringToTop(this.pressSText);
        }
    }
    setState(newState) {
        switch (newState) {
            case "splashscreen":
                this.bigText.setText("Simple Shooter");
                this.text.setVisible(true);
                this.spaceship.hide();
                break;
            case "playing":
                this.text.setVisible(false);
                this.display.reset();
                this.rocks.destroyAllRocks();
                this.spaceship.show();
                break;
            case "gameover":
                this.bigText.setText("Game Over");
                this.text.setVisible(true);
                this.spaceship.hide();
                break;
        }
        this.state = newState;
    }
}
//# sourceMappingURL=SimpleShooter.js.map