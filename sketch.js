const r = require("raylib");
const geometry = require("./geometry");

function running() {
    return !r.WindowShouldClose();
}

const screenWidth = 900;
const halfScreenWidth = screenWidth / 2;
const screenHeight = 600;
const Title = "Particle Detector";
const screenFPS = 50;
const screenColor = r.BLACK;

function drawParticle(start, width, screenHeight, color) {
    r.DrawRectangle(start, 0, width, screenHeight, color);
}

function choseColor(detectorStart, detectorEnd, particle1Start, particle1End, particle2Start, particle2End) {
    collisionFor1 = geometry.rangeOverlap(detectorStart, detectorEnd, particle1Start, particle1End);
    collisionFor2 = geometry.rangeOverlap(detectorStart, detectorEnd, particle2Start, particle2End);
    return collisionFor1 || collisionFor2 ? r.RED : r.WHITE;
}

function setup() {
    r.InitWindow(screenWidth, screenHeight, Title);
    r.SetTargetFPS(screenFPS);
}

let detector1X = 0;
let detector1End = 0;
let detector1Color = r.WHITE;

let detector2X = halfScreenWidth;
let detector2End = 0;
let detector2Color = r.WHITE;

const detectorY = 0;
const detectorWidth = 50;

let dalta1_x = 2;
let dalta2_x = 5;

const particle1Start = 250;
const particle1Width = 200;
const particle1End = particle1Start + particle1Width;

const particle2Start = 700;
const particle2Width = 20;
const particle2End = particle2Start + particle2Width;

const particleColor = r.BLUE;

function update() {
    // updating detectors location
    detector1X += dalta1_x;
    detector2X += dalta2_x;

    // updating detectors End
    detector1End = detector1X + detectorWidth;
    detector2End = detector2X + detectorWidth;

    // checking collision
    const collision1 = geometry.checkCollisionWithEdges(detector1X, detector1End, 0, halfScreenWidth);
    const collision2 = geometry.checkCollisionWithEdges(detector2X, detector2End, halfScreenWidth, screenWidth);

    // changing direction.
    if (collision1) {
        dalta1_x = -dalta1_x;
    }
    if (collision2) {
        dalta2_x = -dalta2_x;
    }
}


function draw() {
    r.BeginDrawing();
    r.ClearBackground(screenColor);

    r.DrawLine(screenWidth / 2, 0, screenWidth / 2, screenHeight, r.YELLOW);

    drawParticle(particle1Start, particle1Width, screenHeight, particleColor);
    drawParticle(particle2Start, particle2Width, screenHeight, particleColor);

    detector1Color = choseColor(detector1X, detector1End, particle1Start, particle1End, particle2Start, particle2End);
    detector2Color = choseColor(detector2X, detector2End, particle1Start, particle1End, particle2Start, particle2End);

    r.DrawRectangle(detector1X, detectorY, detectorWidth, screenHeight, detector1Color);
    r.DrawRectangle(detector2X, detectorY, detectorWidth, screenHeight, detector2Color);

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