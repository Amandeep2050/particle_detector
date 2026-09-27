const r = require("raylib");
const geometry = require("./geometry");

function running() {
    return !r.WindowShouldClose();
}

function drawParticle(start, end, width, height, color) {
    r.DrawRectangle(start, end, width, height, color);
}

function choseColor(detectorX_Y, detectorEnd, particle1StartX_Y, particle1End, particle2StartX_Y, particle2End) {
    collisionParticle1 = geometry.rangeOverlap(detectorX_Y, detectorEnd, particle1StartX_Y, particle1End);
    collisionParticle2 = geometry.rangeOverlap(detectorX_Y, detectorEnd, particle2StartX_Y, particle2End);
    return collisionParticle1 || collisionParticle2 ? r.RED : r.WHITE;
}

const screenWidth = 900;
const screenHeight = 600;

function setup() {
    const Title = "Particle Detector";
    const screenFPS = 50;

    r.InitWindow(screenWidth, screenHeight, Title);
    r.SetTargetFPS(screenFPS);
}

// detector 1
let detector1X = 0;
let detector1End = 0;
let detector1Color = r.WHITE;

// detector 2
let detector2X = screenWidth / 2;
let detector2End = 0;
let detector2Color = r.WHITE;

const detectorY = 0;
const detectorWidth = 50;

// detector 3
const detector3X = 0;
let detector3Y = 0;
let detector3End = 0;
let detector3Color = r.WHITE;
const detector3Width = screenWidth;
const detector3Height = 50;

// deltaX for detectors
let dx_1 = 2;
let dx_2 = 5;
let dx_3 = 5;

// vertical particles
const particle1StartX = 200;
const particle1StartY = 0;
const particle1Width = 100;
const particle1Height = screenHeight;
const particle1End = particle1StartX + particle1Width;

const particle2StartX = 800;
const particle2StartY = 0;
const particle2Width = 30;
const particle2Height = screenHeight;
const particle2End = particle2StartX + particle2Width;

// horizontal particles
const particle3StartX = 0;
const particle3StartY = 200;
const particle3Width = screenWidth;
const particle3Height = 40;
const particle3End = particle3StartY + particle3Height;

const particleColor = r.BLUE;

function update() {
    // updating detectors location
    detector1X += dx_1;
    detector2X += dx_2;
    detector3Y += dx_3;

    // updating horizontal detectors end
    detector1End = detector1X + detectorWidth;
    detector2End = detector2X + detectorWidth;

    // updating vertical detector end
    detector3End = detector3Y + detector3Height;

    const halfScreenWidth = screenWidth / 2;

    // checking collision
    const collisionOfDetector1 = geometry.checkCollisionWithEdges(detector1X, detector1End, 0, halfScreenWidth);
    const collisionOfDetector2 = geometry.checkCollisionWithEdges(detector2X, detector2End, halfScreenWidth, screenWidth);
    const collisionOfDetector3 = geometry.checkCollisionWithEdges(detector3Y, detector3End, 0, screenHeight);

    // changing direction.
    if (collisionOfDetector1) {
        dx_1 = -dx_1;
    }
    if (collisionOfDetector2) {
        dx_2 = -dx_2;
    }
    if (collisionOfDetector3) {
        dx_3 = -dx_3;
    }

    // Chosing color for detectors
    detector1Color = choseColor(detector1X, detector1End, particle1StartX, particle1End, particle2StartX, particle2End);
    detector2Color = choseColor(detector2X, detector2End, particle1StartX, particle1End, particle2StartX, particle2End);
    detector3Color = choseColor(detector3Y, detector3End, particle3StartY, particle3End, particle3StartY, particle3End);
}


function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    // Drawing particles
    drawParticle(particle1StartX, particle1StartY, particle1Width, particle1Height, particleColor);
    drawParticle(particle2StartX, particle2StartY, particle2Width, particle2Height, particleColor);
    drawParticle(particle3StartX, particle3StartY, particle3Width, particle3Height, particleColor);

    // Drawing Rectangles
    r.DrawRectangle(detector1X, detectorY, detectorWidth, screenHeight, detector1Color);
    r.DrawRectangle(detector2X, detectorY, detectorWidth, screenHeight, detector2Color);
    r.DrawRectangle(detector3X, detector3Y, detector3Width, detector3Height, detector3Color);

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