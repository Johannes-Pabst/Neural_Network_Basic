import { Creature } from "./Creature.js"
import { NeuralCreature } from "./NeuralCreature.js";
import { Predator } from "./Predator.js";
import { Prey } from "./Prey.js";

export class NeuralNetworkScene extends Phaser.Scene {

    predators: Predator[] = [];
    preys: Prey[] = [];

    evalNeuralNetworkQueue: NeuralCreature[] = [];
    n: number = 1.5;
    worldWith: number = 2000 * this.n;
    worldHeight: number = 1500 * this.n;

    border: Phaser.GameObjects.Graphics;

    maxPreys = 50;
    maxPredators = 50;


    constructor() {
        super({
            key: "NeuralNetwork"
        });
    }

    init(params: any): void { }

    preload(): void {
    }

    create(): void {

        this.setupBorderAndCamera();

        // let prey = new Prey(this);
        // prey.setPosition(200, 200);
        // prey.setRaysVisible(true);
        // prey.setRotation(1.2);

        this.createPredatorsAndPreys(30, 30);

    }

    createPredatorsAndPreys(predatorCount: number, preyCount: number) {

        for (let i = 0; i < predatorCount; i++) {
            let predator = new Predator(this);
            predator.setPosition(Math.random() * this.worldWith, Math.random() * this.worldHeight);
            predator.setRotation(Math.random() * Math.PI * 2);
            predator.setRaysVisible(true);
        }

        for (let i = 0; i < predatorCount; i++) {
            let prey = new Prey(this);
            prey.setPosition(Math.random() * this.worldWith, Math.random() * this.worldHeight);
            prey.setRotation(Math.random() * Math.PI * 2);
            prey.setRaysVisible(true);
        }



    }

    setupBorderAndCamera() {
        let borderWith = 4;
        let borderWithHalf = borderWith / 2;
        this.border = this.add.graphics({ lineStyle: { color: 0x808080, width: borderWith } });
        this.border.strokeRect(borderWithHalf, borderWithHalf, this.worldWith - borderWith, this.worldHeight - borderWith);

        this.cameras.main.setBounds(0, 0, this.worldWith, this.worldHeight);
        this.cameras.main.setBackgroundColor(0x000020);
        this.cameras.main.setScroll(0, 0);

        this.initMouseZoom();
    }


    update(time: number, delta: number): void {

        let startTime = performance.now();

        for (let creature of this.predators) creature.update(time, delta);
        for (let creature of this.preys) creature.update(time, delta);

        // use 50% of system time to evaluate neural networks:
        while (performance.now() - startTime < delta * 0.5) {

            if (this.evalNeuralNetworkQueue.length > 0) {
                this.evalNeuralNetworkQueue.pop().evaluateNeuralNetwork(this.preys, this.predators);
            } else {
                this.evalNeuralNetworkQueue = this.preys.concat(this.predators);
                console.log("Zeitschritt");
                if (this.evalNeuralNetworkQueue.length == 0) {
                    break;
                }
            }
        }

    }

    initMouseZoom() {
        let camera = this.cameras.main;
        camera.setZoom(0.2)

        this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {

            if (deltaY > 0) {
                var newZoom = camera.zoom - .1;
                if (newZoom > 0.1) {
                    camera.zoom = newZoom;
                }
            }

            if (deltaY < 0) {
                var newZoom = camera.zoom + .1;
                if (newZoom < 4) {
                    camera.setZoom(newZoom);
                }
            }

            // camera.centerOn(pointer.worldX, pointer.worldY);
            camera.pan(pointer.worldX, pointer.worldY, 2000, "Power2");

        });

        this.input.on('pointermove', (pointer) => {
            if (!pointer.isDown) return;

            camera.scrollX -= (pointer.x - pointer.prevPosition.x) / camera.zoom;
            camera.scrollY -= (pointer.y - pointer.prevPosition.y) / camera.zoom;

            console.log(camera.scrollX)

        });
    }

}
