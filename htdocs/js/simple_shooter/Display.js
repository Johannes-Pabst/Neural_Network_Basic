export class Display {
    constructor(scene) {
        this.scene = scene;
        this.ships = [];
        let screenWidth = this.scene.sys.game.scale.gameSize.width;
        this.scoreText = scene.add.text(screenWidth - 100, 0, "00000", { fontFamily: 'Arial', fontSize: '32px', color: '#00ff00' });
        this.reset();
    }
    reset() {
        this.lives = 3;
        this.score = 0;
        this.update();
    }
    update() {
        while (this.lives > this.ships.length) {
            let ship = this.scene.add.sprite(this.ships.length * 40 + 20, 20, "spritesheet", "spaceship");
            ship.scale = 0.5;
            this.ships.push(ship);
        }
        for (let i = 0; i < this.ships.length; i++) {
            this.ships[i].visible = i < this.lives;
        }
        this.scoreText.setText(Phaser.Utils.String.Pad(this.score, 5, "0", 1));
    }
}
//# sourceMappingURL=Display.js.map