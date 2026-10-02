const sketch = require("./sketch");

function loop(world) {
    while (sketch.running()) {
        sketch.update(world);
        sketch.draw(world);
    }
}

function main() {
    const WIDTH = 900;
    const HEIGHT = 600;
    const TITLE = "Particle Detector";
    const world = sketch.setup(WIDTH, HEIGHT, TITLE);
    loop(world);
    sketch.teardown();
}

main();
