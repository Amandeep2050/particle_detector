function checkCollisionWithEdges(detectorX, detectorWidth, screenWidth) {
    rightEdgeX = detectorX + detectorWidth;
    const collision = rightEdgeX === screenWidth || detectorX === 0;
    return collision;
}

module.exports = {
    checkCollisionWithEdges,
};