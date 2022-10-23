import { Creature } from "./Creature.js";
import { NeuralCreature } from "./NeuralCreature.js";
import { NeuralNetworkScene } from "./NeuralNetworkScene.js";

export class Predator extends NeuralCreature {

    constructor(scene: Phaser.Scene){
        super(scene, "predator", -30, 30, 10, 400);
        (<NeuralNetworkScene>scene).predators.push(this);
        this.energy = 5000;
    }
    
    getChild(): NeuralCreature {
        let p = new Predator(this.scene);
        p.setRaysVisible(true);
        return p;
    }
}