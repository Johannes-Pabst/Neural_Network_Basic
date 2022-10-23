import { NeuralCreature } from "./NeuralCreature.js";
export class Prey extends NeuralCreature {
    constructor(scene) {
        super(scene, "prey", -180, 170, 30, 400);
        scene.preys.push(this);
        this.energy = 5000;
    }
    getChild() {
        let p = new Prey(this.scene);
        p.setRaysVisible(true);
        return p;
    }
}
//# sourceMappingURL=Prey.js.map