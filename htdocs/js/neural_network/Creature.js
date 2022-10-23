export class Creature extends Phaser.GameObjects.Container {
    constructor(scene, type, raysFromAngle, raysToAngle, numberOfRays, rayLength) {
        super(scene);
        this.type = type;
        this.raysFromAngle = raysFromAngle;
        this.raysToAngle = raysToAngle;
        this.numberOfRays = numberOfRays;
        this.rayLength = rayLength;
        this.visibleRays = [];
        this.rayAngles = [];
        this.raysVisible = false;
        scene.add.existing(this);
        this.radius = 30;
        let deltaAngle = (this.raysToAngle - this.raysFromAngle) / (this.numberOfRays - 1);
        for (let angle = this.raysFromAngle; angle <= this.raysToAngle + 0.001; angle += deltaAngle) {
            let angleRad = angle / 180 * Math.PI;
            this.rayAngles.push(angleRad);
            let ray = scene.add.graphics({ lineStyle: { color: 0xa0a0a0 } });
            ray.lineBetween(0, 0, this.rayLength * Math.cos(angleRad), this.rayLength * Math.sin(angleRad));
            this.visibleRays.push(ray);
            this.add(ray);
            ray.setVisible(false);
        }
        this.mainCircle = scene.add.graphics({ fillStyle: { color: type == "predator" ? 0xff0000 : 0x20ff20 } });
        this.mainCircle.fillCircle(0, 0, this.radius);
        this.add(this.mainCircle);
        this.eye1White = scene.add.graphics({ fillStyle: { color: 0xffffff } });
        this.eye1White.fillCircle(10, -10, 8);
        this.add(this.eye1White);
        this.eye2White = scene.add.graphics({ fillStyle: { color: 0xffffff } });
        this.eye2White.fillCircle(10, 10, 8);
        this.add(this.eye2White);
        this.eye1Black = scene.add.graphics({ fillStyle: { color: 0x000000 } });
        this.eye1Black.fillCircle(10, -10, 4);
        this.add(this.eye1Black);
        this.eye2Black = scene.add.graphics({ fillStyle: { color: 0x000000 } });
        this.eye2Black.fillCircle(10, 10, 4);
        this.add(this.eye2Black);
    }
    update(time, delta) {
        let vAngleRad = this.vAngle / 180 * Math.PI;
        let dw = Math.min(Math.abs(vAngleRad / 60 * delta), this.energy * 10);
        if (dw > 0.000001) { //warum eine 0 weniger als...
            this.rotate(dw * Math.sign(vAngleRad));
            this.energy -= dw / 10;
        }
        let d = Math.min(this.v / 60 * delta, this.energy);
        if (d >= 0.0000001) { //...da?
            this.move(d * Math.cos(this.rotation), d * Math.sin(this.rotation));
            this.energy -= d;
        }
    }
    destroy(fromScene) {
        let sc = this.scene;
        if (this.type == "predator") {
            let predators = sc.predators;
            predators.splice(predators.indexOf(this), 1);
        }
        else {
            let preys = sc.preys;
            preys.splice(preys.indexOf(this), 1);
        }
        sc.evalNeuralNetworkQueue.splice(sc.evalNeuralNetworkQueue.indexOf(this), 1);
        super.destroy();
    }
    setRaysVisible(visible) {
        for (let ray of this.visibleRays) {
            ray.setVisible(visible);
        }
        this.raysVisible = visible;
    }
    getRayDistancesAndCollidingCreatures(otherCreatures) {
        let distances = new Array(this.numberOfRays).fill(1000000);
        let collidingCreatures = [];
        for (let creature of otherCreatures) {
            if (creature.type != this.type) {
                this.updateDistances(creature, distances, collidingCreatures);
            }
        }
        if (this.raysVisible) {
            for (let i = 0; i < this.visibleRays.length; i++) {
                if (distances[i] < this.rayLength + this.radius) {
                    this.visibleRays[i].setAlpha(1.0);
                }
                else {
                    this.visibleRays[i].setAlpha(0.3);
                }
            }
        }
        return {
            distances: distances,
            collidingCreatures: collidingCreatures
        };
    }
    updateDistances(otherCreature, distances, collidingCreatures) {
        let x = otherCreature.x;
        let y = otherCreature.y;
        let myX = this.x;
        let myY = this.y;
        let dx = (x - myX);
        let dy = (y - myY);
        let rayLengthPlusRadius = this.rayLength + this.radius;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > rayLengthPlusRadius) {
            return null;
        }
        if (distance < 2 * otherCreature.radius) {
            collidingCreatures.push(otherCreature);
        }
        let angle = Math.atan2(dy, dx) - this.rotation;
        // let deltaAngle = 2*Math.PI * 2 * otherCreature.radius/(2*Math.PI * distance);
        let deltaAngle = otherCreature.radius / distance;
        for (let i = 0; i < this.rayAngles.length; i++) {
            if (Math.abs(angle - this.rayAngles[i]) < deltaAngle) {
                if (distances[i] > distance) {
                    distances[i] = distance;
                }
            }
        }
    }
    move(dx, dy) {
        let sc = this.scene;
        let newX = this.x + dx;
        let newY = this.y + dy;
        if (newX < 0)
            newX += sc.worldWith;
        if (newX > sc.worldWith)
            newX -= sc.worldWith;
        if (newY < 0)
            newY += sc.worldHeight;
        if (newY > sc.worldHeight)
            newY -= sc.worldHeight;
        this.setPosition(newX, newY);
    }
    rotate(dw) {
        let newRotation = this.rotation + dw;
        if (newRotation < 0) {
            newRotation = newRotation + Math.floor(-newRotation / (Math.PI * 2) + 1) * Math.PI * 2;
        }
        if (newRotation > 2 * Math.PI) {
            newRotation = newRotation - Math.floor(newRotation / (Math.PI * 2)) * Math.PI * 2;
        }
        this.setRotation(newRotation);
    }
}
//# sourceMappingURL=Creature.js.map