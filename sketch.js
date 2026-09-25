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

function setup() {
    r.InitWindow(screenWidth, screenHeight, Title);
    r.SetTargetFPS(screenFPS);
}

let detectorX = 0;
const detectorY = 0;
const detectorWidth = 50;
const detectorColor = r.WHITE;
let xSpeed = 1;

function update() {
    detectorX += xSpeed;

    const collision = geometry.checkCollisionWithEdges(detectorX, detectorWidth, screenWidth);

    if (collision) {
        xSpeed = -xSpeed;
    }
}


const particleFieldStart = 300;
const particleFieldWidth = 200;
const particleColor = r.BLUE;

function draw() {
    r.BeginDrawing();
    r.ClearBackground(screenColor);

    drawParticle(particleFieldStart, particleFieldWidth, screenHeight, particleColor);
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