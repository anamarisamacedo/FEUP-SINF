var L = 5.0;
var C = 1.0;

function calculateDistance(startPoint, endPoint) {
    let warehouseIdSt = startPoint[0]; // 'A', 'B' or 'C'
    let sectionIdSt = startPoint[1]; // 1, 2 or 3
    let laneIdSt = startPoint[2]; // 1 or 2

    let warehouseIdDest = endPoint[0]; // 'A', 'B' or 'C'
    let sectionIdDest = endPoint[1]; // 1, 2 or 3
    let laneIdDest = endPoint[2]; // 1 or 2

    let warehouseDelta = warehouseIdDest - warehouseIdSt;
    let sectionDelta = sectionIdDest - sectionIdSt;
    let laneIdDelta = laneIdDest - laneIdSt;

    let verticalDistance = Math.abs(sectionDelta) * L + laneIdDelta * L/3;
    let horizontalDistance = (L/2 + C + C + L/2) * Math.max(Math.abs(warehouseDelta), 1);

    return verticalDistance + horizontalDistance;
}