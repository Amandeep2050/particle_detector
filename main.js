const sketch = require("./sketch");

function loop() {
    while (sketch.running()) {
        sketch.update();
        sketch.draw();
    }
}

function main() {
    const WIDTH = 900;
    const HEIGHT = 600;
    const TITLE = "Particle Detector";
    sketch.setup(WIDTH, HEIGHT, TITLE);
    loop();
    sketch.teardown();
}

main();
