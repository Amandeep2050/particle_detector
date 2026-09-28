const r = require("raylib");

const screenWidth = 900;

// detector 1
let d1_start = 0;
const d1_width = 50;
let d1_color = r.WHITE;
let d1_velocity = 2;
let d1_hasDetected = false;
let d1_lower;
let d1_upper;

// detector 2
let d2_start = screenWidth / 2;
const d2_width = 50;
let d2_color = r.WHITE;
let d2_velocity = 5;
let d2_hasDetected = false;
let d2_lower;
let d2_upper;

// detector 3
let d3_start = 0;
const d3_height = 50;
let d3_color = r.WHITE;
let d3_velocity = 5;
let d3_hasDetected = false;
let d3_lower;
let d3_upper;

// vertical particles
const p1_start = 200;
const p1_width = 100;

const p2_start = 800;
const p2_width = 30;

// horizontal particles
const p3_start = 200;
const p3_height = 40;

function running() {
    return !r.WindowShouldClose();
}

function setup(width, height, title) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(50);

    d1_lower = 0;
    d1_upper = r.GetScreenWidth() / 2;
    d2_lower = d1_upper;
    d2_upper = r.GetScreenWidth();
    d3_lower = 0;
    d3_upper = r.GetScreenHeight();
}

function drawVerticleRange(start, width, color) {
    r.DrawRectangle(start, 0, width, r.GetScreenHeight(), color);
}

function drawHorizontalRange(start, height, color) {
    r.DrawRectangle(0, start, r.GetScreenWidth(), height, color);
}

function isDetectorOutOfBounds(start, end, lower, upper) {
    return end === upper || start === lower;
}

function changeDetectorPosition(start, velocity) {
    return start += velocity;
}

function changeDetectorVelocity(start, width, lower, upper, velocity) {
    const end = start + width;
    return isDetectorOutOfBounds(start, end, lower, upper) ? -velocity : velocity;
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

function chooseColor(hasDetected) {
    return hasDetected ? r.RED : r.WHITE;
}

function update() {
    d1_start = changeDetectorPosition(d1_start, d1_velocity);
    d1_velocity = changeDetectorVelocity(d1_start, d1_width, d1_lower, d1_upper, d1_velocity);
    d1_hasDetected = overlapFields(d1_start, d1_width, p1_start, p1_width, p2_start, p2_width);
    d1_color = chooseColor(d1_hasDetected);

    d2_start = changeDetectorPosition(d2_start, d2_velocity);
    d2_velocity = changeDetectorVelocity(d2_start, d2_width, d2_lower, d2_upper, d2_velocity);
    d2_hasDetected = overlapFields(d2_start, d2_width, p1_start, p1_width, p2_start, p2_width);
    d2_color = chooseColor(d2_hasDetected);

    d3_start = changeDetectorPosition(d3_start, d3_velocity);
    d3_velocity = changeDetectorVelocity(d3_start, d3_height, d3_lower, d3_upper, d3_velocity);
    d3_hasDetected = overlapFields(d3_start, d3_height, p3_start, p3_height);
    d3_color = chooseColor(d3_hasDetected);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    // Drawing particles
    drawVerticleRange(p1_start, p1_width, r.SKYBLUE);
    drawVerticleRange(p2_start, p2_width, r.SKYBLUE);
    drawHorizontalRange(p3_start, p3_height, r.SKYBLUE);

    // Drawing detectors
    drawVerticleRange(d1_start, d1_width, d1_color);
    drawVerticleRange(d2_start, d2_width, d2_color);
    drawHorizontalRange(d3_start, d3_height, d3_color);

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