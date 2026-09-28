const r = require("raylib");

function isOutOfBounds(start, end, lower, upper) {
    return end === upper || start === lower;
}

function changePosition(start, velocity) {
    return start += velocity;
}

function changeVelocity(start, width, lower, upper, velocity) {
    const end = start + width;
    return isOutOfBounds(start, end, lower, upper) ? -velocity : velocity;
}

function chooseColor(hasDetected) {
    return hasDetected ? r.RED : r.WHITE;
}

module.exports = {
    isOutOfBounds,
    changePosition,
    changeVelocity,
    chooseColor,
};
