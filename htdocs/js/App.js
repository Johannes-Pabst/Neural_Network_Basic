import { NeuralNetworkScene } from "./neural_network/NeuralNetworkScene.js";
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    }, scene: [
        new NeuralNetworkScene()
        // new GamepadTest()
        // new MouseTest()
        // new AccelerationTest()
    ],
    // physics: {
    //   default: "arcade",
    //   arcade: {
    //     debug: true
    //   }
    // },
    input: {
        gamepad: true
    }
};
new Phaser.Game(config);
//# sourceMappingURL=App.js.map