var L = 6.0;
var C = 2.0;

const functions = {
    calculateDistance: function (startPoint, endPoint) {
        let sectionIdSt = startPoint[1]; // 1, 2 or 3
        let laneIdSt = startPoint[2]; // 1 or 2

        let sectionIdDest = endPoint[1]; // 1, 2 or 3
        let laneIdDest = endPoint[2]; // 1 or 2
    
        let warehouseDelta = endPoint.charCodeAt(0) - startPoint.charCodeAt(0);
        console.log(warehouseDelta);
        let sectionDelta = sectionIdDest - sectionIdSt;
        let laneIdDelta = laneIdDest - laneIdSt;
    
        let verticalDistance = Math.abs(sectionDelta) * L + laneIdDelta * L/3;
        let horizontalDistance = (L/2 + C + C + L/2) * Math.max(Math.abs(warehouseDelta), 1);
    
        return verticalDistance + horizontalDistance;
    }
}

export default functions;

