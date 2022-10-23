import { NeuralCreature } from "./NeuralCreature.js";
export class Predator extends NeuralCreature {
    constructor(scene) {
        super(scene, "predator", -30, 30, 10, 400);
        scene.predators.push(this);
        this.energy = 5000;
    }
    getChild() {
        let p = new Predator(this.scene);
        p.setRaysVisible(true);
        return p;
    }
}
//# sourceMappingURL=Predator.js.map