const r = require("raylib");
const geometry = require("./geometry");

function running() {
    return !r.WindowShouldClose();
}

const screenWidth = 900;
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

let detectorX = 0;
const detectorY = 0;
const detectorWidth = 50;
let detectorColor = r.WHITE;
let detectorEnd = 0;
let xSpeed = 1;

const particle1Start = 300;
const particle1Width = 200;
const particle1End = particle1Start + particle1Width;

const particle2Start = 700;
const particle2Width = 20;
const particle2End = particle2Start + particle2Width;

const particleColor = r.BLUE;

function update() {
    detectorX += xSpeed;

    const collision = geometry.checkCollisionWithEdges(detectorX, detectorWidth, screenWidth);

    if (collision) {
        xSpeed = -xSpeed;
    }

    detectorEnd = detectorX + detectorWidth;
}


function draw() {
    r.BeginDrawing();
    r.ClearBackground(screenColor);

    drawParticle(particle1Start, particle1Width, screenHeight, particleColor);
    drawParticle(particle2Start, particle2Width, screenHeight, particleColor);

    detectorColor = choseColor(detectorX, detectorEnd, particle1Start, particle1End, particle2Start, particle2End);

    r.DrawRectangle(detectorX, detectorY, detectorWidth, screenHeight, detectorColor);

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