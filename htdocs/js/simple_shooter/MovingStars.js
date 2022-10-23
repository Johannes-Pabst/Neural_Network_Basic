export class MovingStars {
    constructor(scene, countPerLayer, layersCount, layerSpeed) {
        this.scene = scene;
        this.layers = [];
        this.width = this.scene.sys.game.scale.gameSize.width;
        this.height = this.scene.sys.game.scale.gameSize.height;
        for (let l = 0; l < layersCount; l++) {
            let layer = {
                blitters: [],
                offsetX: 0,
                speed: layerSpeed[l]
            };
            for (let i = 0; i <= 1; i++) {
                let blitter = this.createStars(countPerLayer * (layersCount - l));
                blitter.setAlpha((l + 1) * (1 / layersCount));
                layer.blitters.push(blitter);
                blitter.setPosition(this.width * i, 0);
            }
            this.layers.push(layer);
        }
        let that = this;
        this.scene.events.on('update', () => {
            that.update();
        });
    }
    update() {
        for (let layer of this.layers) {
            for (let blitter of layer.blitters) {
                blitter.setPosition(blitter.x - layer.speed, blitter.y);
            }
            layer.offsetX -= layer.speed;
            if (layer.offsetX <= -this.width) {
                let starOut = layer.blitters[0];
                layer.blitters.splice(0, 1);
                layer.blitters.push(starOut);
                starOut.setPosition(this.width, 0);
                layer.offsetX = 0;
            }
        }
    }
    createStars(n) {
        let stars = this.scene.add.blitter(0, 0, "spritesheet");
        for (let s = 1; s <= 4; s++) {
            let star = "star_" + Phaser.Math.Between(1, 4);
            for (let i = 0; i <= n / 4; i++) {
                stars.create(Phaser.Math.Between(0, this.width), Phaser.Math.Between(0, this.height), star);
            }
        }
        return stars;
    }
}
//# sourceMappingURL=MovingStars.js.map