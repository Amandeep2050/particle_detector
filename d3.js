const r = require("raylib");

let start = 0;
const height = 50;
let color = r.WHITE;
let velocity = 5;
let hasDetected = false;
let lower;
let upper;

module.exports = {
    start,
    height,
    color,
    velocity,
    hasDetected,
    lower,
    upper,
};
