const r = require("raylib");

let start = 0;
const width = 50;
let color = r.WHITE;
let velocity = 2;
let hasDetected = false;
let lower;
let upper;

module.exports = {
    start,
    width,
    color,
    velocity,
    hasDetected,
    lower,
    upper,
};
