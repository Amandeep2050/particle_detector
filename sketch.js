const r = require("raylib");
const d = require("./detector");
const p = require("./particles");

function running() {
    return !r.WindowShouldClose();
}

function setup(width, height, title) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(50);

    const world = {};

    world.d1 = d.createDetectorV(0, width / 2, 50, 2);
    world.d2 = d.createDetectorV(width / 2, width, 50, 5);
    world.d3 = d.createDetectorH(0, height, 50, 5);

    world.field1 = p.createFieldV(200, 100);
    world.field2 = p.createFieldV(800, 30);
    world.field3 = p.createFieldH(200, 40);

    return world;
}

function update(world) {
    d.updateDetectorV(world.d1, world.field1, world.field2);
    d.updateDetectorV(world.d2, world.field1, world.field2);
    d.updateDetectorH(world.d3, world.field3);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    p.draw(world.field1, world.field2, world.field3);
    d.draw(world.d1, world.d2, world.d3);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};