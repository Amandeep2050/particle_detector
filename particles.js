const r = require("raylib");
const range = require("./range");

function createFieldV(start, width) {
    return {
        start: start,
        width: width,
    };
}

function createFieldH(start, height) {
    return {
        start: start,
        height: height,
    };
}

function draw(f1, f2, f3) {
    range.drawVerticleRange(f1.start, f1.width, r.SKYBLUE);
    range.drawVerticleRange(f2.start, f2.width, r.SKYBLUE);
    range.drawHorizontalRange(f3.start, f3.height, r.SKYBLUE);
}

module.exports = {
    createFieldV,
    createFieldH,
    draw,
};
