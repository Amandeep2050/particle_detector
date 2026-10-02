const r = require("raylib");

function rangeOverlap(start1, end1, start2, end2) {
    return isBetween(start1, end1, start2) || isBetween(start2, end2, start1);
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

function overlapsFields(detectorStart, detectorWidth, field1_start, field1_width, field2_start, field2_width) {
    const detectorEnd = detectorStart + detectorWidth;
    const field1_end = field1_start + field1_width;
    const field2_end = field2_start + field2_width;

    return (rangeOverlap(detectorStart, detectorEnd, field1_start, field1_end) ||
        rangeOverlap(detectorStart, detectorEnd, field2_start, field2_end));
}

module.exports = {
    drawVerticleRange,
    drawHorizontalRange,
    overlapsFields,
}