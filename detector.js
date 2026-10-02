const r = require("raylib");
const range = require("./range");

function isOutOfBounds(start, end, lower, upper) {
    return end > upper || start < lower;
}

function changePosition(d) {
    d.start += d.velocity;
    return d;
}

function changeVelocityV(d) {
    const end = d.start + d.width;
    d.velocity = isOutOfBounds(d.start, end, d.lower, d.upper) ? -d.velocity : d.velocity;
    return d;
}

function changeVelocityH(d) {
    const end = d.start + d.height;
    d.velocity = isOutOfBounds(d.start, end, d.lower, d.upper) ? -d.velocity : d.velocity;
    return d;
}

function chooseColor(hasDetected) {
    return hasDetected ? r.RED : r.WHITE;
}

function updateDetectorV(d, f1, f2) {
    changeVelocityV(d);
    changePosition(d);
    d.hasDetected = range.overlapsFields(d.start, d.width, f1.start, f1.width, f2.start, f2.width);
    d.color = chooseColor(d.hasDetected);
}

function updateDetectorH(d, f) {
    changeVelocityH(d);
    changePosition(d);
    d.hasDetected = range.overlapsFields(d.start, d.height, f.start, f.height);
    d.color = chooseColor(d.hasDetected);
}

function draw(d1, d2, d3) {
    range.drawVerticleRange(d1.start, d1.width, d1.color);
    range.drawVerticleRange(d2.start, d2.width, d2.color);
    range.drawHorizontalRange(d3.start, d3.height, d3.color);
}

function createDetectorV(lower, upper, width, velocity) {
    return {
        start: lower,
        width: width,
        velocity: velocity,
        hasDetected: false,
        lower: lower,
        upper: upper,
        color: r.WHITE,
    }
}

function createDetectorH(lower, upper, height, velocity) {
    return {
        start: lower,
        height: height,
        velocity: velocity,
        hasDetected: false,
        lower: lower,
        upper: upper,
        color: r.WHITE,
    }
}

module.exports = {
    createDetectorV,
    createDetectorH,
    updateDetectorV,
    updateDetectorH,
    draw,
};
