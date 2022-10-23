import { Creature } from "./Creature.js";
import { NeuralCreature } from "./NeuralCreature.js";
import { NeuralNetworkScene } from "./NeuralNetworkScene.js";

export class Prey extends NeuralCreature {
    
    constructor(scene: Phaser.Scene){
        super(scene, "prey", -180, 170, 
        30, 400);
        (<NeuralNetworkScene>scene).preys.push(this);

        this.energy = 5000;
    }

    getChild(): NeuralCreature {
        let p = new Prey(this.scene);
        p.setRaysVisible(true)
        return p;
    }

}