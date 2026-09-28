const r = require("raylib");
const d = require("./detector");
const d1 = require("./d1");
const d2 = require("./d2");
const d3 = require("./d3");
const p = require("./particles");

function running() {
    return !r.WindowShouldClose();
}

function setup(width, height, title) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(50);

    d1.lower = 0;
    d1.upper = r.GetScreenWidth() / 2;
    d2.lower = d1.upper;
    d2.upper = r.GetScreenWidth();
    d3.lower = 0;
    d3.upper = r.GetScreenHeight();
}

function drawVerticleRange(start, width, color) {
    r.DrawRectangle(start, 0, width, r.GetScreenHeight(), color);
}

function drawHorizontalRange(start, height, color) {
    r.DrawRectangle(0, start, r.GetScreenWidth(), height, color);
}

function isBetween(x, y, a) {
    return x <= a && a <= y;
}

function rangeOverlap(start1, end1, start2, end2) {
    return isBetween(start1, end1, start2) || isBetween(start2, end2, start1);
}

function overlapFields(detectorStart, detectorWidth, field1_start, field1_width, field2_start, field2_width) {
    const detectorEnd = detectorStart + detectorWidth;
    const field1_end = field1_start + field1_width;
    const field2_end = field2_start + field2_width;

    return (rangeOverlap(detectorStart, detectorEnd, field1_start, field1_end) ||
        rangeOverlap(detectorStart, detectorEnd, field2_start, field2_end));
}

function update() {
    d1.start = d.changePosition(d1.start, d1.velocity);
    d1.velocity = d.changeVelocity(d1.start, d1.width, d1.lower, d1.upper, d1.velocity);
    d1.hasDetected = overlapFields(d1.start, d1.width, p.p1_start, p.p1_width, p.p2_start, p.p2_width);
    d1.color = d.chooseColor(d1.hasDetected);

    d2.start = d.changePosition(d2.start, d2.velocity);
    d2.velocity = d.changeVelocity(d2.start, d2.width, d2.lower, d2.upper, d2.velocity);
    d2.hasDetected = overlapFields(d2.start, d2.width, p.p1_start, p.p1_width, p.p2_start, p.p2_width);
    d2.color = d.chooseColor(d2.hasDetected);

    d3.start = d.changePosition(d3.start, d3.velocity);
    d3.velocity = d.changeVelocity(d3.start, d3.height, d3.lower, d3.upper, d3.velocity);
    d3.hasDetected = overlapFields(d3.start, d3.height, p.p3_start, p.p3_height);
    d3.color = d.chooseColor(d3.hasDetected);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    // Drawing particles
    drawVerticleRange(p.p1_start, p.p1_width, r.SKYBLUE);
    drawVerticleRange(p.p2_start, p.p2_width, r.SKYBLUE);
    drawHorizontalRange(p.p3_start, p.p3_height, r.SKYBLUE);

    // Drawing detectors
    drawVerticleRange(d1.start, d1.width, d1.color);
    drawVerticleRange(d2.start, d2.width, d2.color);
    drawHorizontalRange(d3.start, d3.height, d3.color);

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