function checkCollisionWithEdges(detectorX, detectorEnd, startingPoint, endingPoint) {
    const collision = detectorEnd === endingPoint || detectorX === startingPoint;
    return collision;
}

function rangeOverlap(start1, end1, start2, end2) {
    return start1 - end2 < 0 && start2 - end1 < 0;
}

module.exports = {
    checkCollisionWithEdges,
    rangeOverlap,
};