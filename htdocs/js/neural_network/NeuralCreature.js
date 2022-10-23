import { Creature } from "./Creature.js";
export class NeuralCreature extends Creature {
    constructor(scene, type, raysFromAngle, raysToAngle, numberOfRays, rayLength) {
        super(scene, type, raysFromAngle, raysToAngle, numberOfRays, rayLength);
        this.lastEvaluationTime = performance.now();
        this.n = new Netz([this.numberOfRays + 1, 5, 5, 2]);
    }
    getWorldWidth() {
        return this.scene.worldWith;
    }
    getWorldHeight() {
        return this.scene.worldHeight;
    }
    evaluateNeuralNetwork(preys, predators) {
        let sc = this.scene;
        let now = performance.now();
        let deltaTime = now - this.lastEvaluationTime;
        this.lastEvaluationTime = now;
        // Ray distances and colliding creatures:
        let rdcc = this.getRayDistancesAndCollidingCreatures(this.type == "predator" ? preys : predators);
        // eigene energy: this.energy
        // gesetzt werden sollen: this.v (in pixel je 1/60 s) und this.vAngle (in radians je 1/60 s)
        // TODO!
        let n = rdcc.distances.slice();
        n.push(this.energy);
        let o = this.n.calc(n);
        this.vAngle = o[0] * 20 - 10;
        this.v = o[1] * 10;
        if (this.v < 3) {
            this.v = 0;
        }
        let delta = this.radius * 8;
        if (this.type == "predator") {
            if (this.energy <= 0) {
                this.destroy();
            }
            for (let i = 0; i < rdcc.collidingCreatures.length; i++) {
                const e = rdcc.collidingCreatures[i];
                e.destroy();
                this.energy += 5000;
            }
            let anteil = sc.predators.length / sc.maxPredators;
            if (this.energy > 10000 * anteil) {
                this.energy -= 5000 * anteil;
                if (sc.predators.length < sc.maxPredators) {
                    let predator = this.getChild();
                    predator.setPosition(this.x + (Math.random() - 0.5) * delta, this.y + (Math.random() - 0.5) * delta);
                    predator.move(0, 0);
                    predator.setRotation(Math.random() * Math.PI * 2);
                    predator.n = new Netz(this.n);
                    predator.n.changeRan(7);
                }
            }
            this.energy -= 0.1;
        }
        else {
            let anteil = sc.preys.length / sc.maxPreys;
            if (this.energy > 10000 * anteil) {
                this.energy -= 2500 * anteil;
                if (sc.preys.length < sc.maxPreys) {
                    let prey = this.getChild();
                    prey.setPosition(this.x + (Math.random() - 0.5) * delta, this.y + (Math.random() - 0.5) * delta);
                    prey.move(0, 0);
                    prey.setRotation(Math.random() * Math.PI * 2);
                    prey.n = new Netz(this.n);
                    prey.n.changeRan(7);
                }
            }
            this.energy += 0.5;
        }
    }
}
class Netz {
    constructor(rn) {
        if (rn instanceof Netz) {
            this.a = [];
            for (let i = 0; i < rn.a.length; i++) {
                this.a[i] = new Row(rn.a[i].n.length, rn.a[i].n[0].length);
                for (let j = 0; j < this.a[i].n.length; j++) {
                    this.a[i].n[j] = rn.a[i].n[j].slice();
                }
            }
        }
        else {
            this.a = [];
            for (let i = 0; i < rn.length - 1; i++) {
                this.a.push(new Row(rn[i], rn[i + 1]));
            }
        }
    }
    calc(r) {
        for (let i = 0; i < this.a.length; i++) {
            r = this.a[i].calc(r);
        }
        return r;
    }
    changeRan(n) {
        for (let i = 0; i < n; i++) {
            this.a[Math.floor(Math.random() * this.a.length)].changeRan();
        }
    }
}
class Row {
    constructor(Num1, Num2) {
        this.num1 = Num1;
        this.num2 = Num2;
        this.n = [];
        for (let x = 0; x < this.num1; x++) {
            this.n.push([]);
            for (let y = 0; y < this.num2; y++) {
                this.n[x].push(Math.random() * 2 - 1);
            }
        }
    }
    calc(r) {
        let r2 = [];
        for (let x = 0; x < this.num2; x++) {
            let o = 0;
            for (let y = 0; y < this.num1; y++) {
                o += r[y] * this.n[y][x];
            }
            o = 1 / (1 + Math.pow(5, o));
            r2.push(o);
        }
        return r2;
    }
    changeRan() {
        let x = Math.floor(Math.random() * this.num1);
        let y = Math.floor(Math.random() * this.num2);
        this.n[x][y] += (Math.random() * 0.5 - 0.25);
    }
}
//# sourceMappingURL=NeuralCreature.js.map