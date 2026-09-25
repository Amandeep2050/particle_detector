function checkCollisionWithEdges(detectorX, detectorWidth, screenWidth) {
    rightEdgeX = detectorX + detectorWidth;
    const collision = rightEdgeX === screenWidth || detectorX === 0;
    return collision;
}

function rangeOverlap(start1, end1, start2, end2) {
    return start1 - end2 < 0 && start2 - end1 < 0;
}

module.exports = {
    checkCollisionWithEdges,
    rangeOverlap,
};