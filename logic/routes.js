var L = 6.0;
var C = 2.0;

var EntryPoint = '@11';
var OutPoint = 'D11';

var validPoints = new Set(
    [EntryPoint,
     'A11', 'A12', 'A21', 'A22', 'A31', 'A32',
     'B11', 'B12', 'B21', 'B22', 'B31', 'B32',
     'C11', 'C12', 'C21', 'C22', 'C31', 'C32',
     OutPoint]
);

var permArr = [],
  usedChars = [];

function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};

const functions = {
    calculateDistance: function (startPoint, endPoint) {
        if(!(validPoints.has(startPoint) && validPoints.has(endPoint))) {
            console.log("Invalid point of warehouse!");
            return Number.MAX_SAFE_INTEGER;
        }

        let sectionIdSt = startPoint[1]; // 1, 2 or 3
        let sectionIdDest = endPoint[1]; // 1, 2 or 3
        let sectionDelta = sectionIdDest - sectionIdSt;

        let laneIdDest = endPoint[2]; // 1 or 2
        let laneIdSt = startPoint[2]; // 1 or 2
        let laneIdDelta = laneIdDest - laneIdSt;

        let warehouseDelta = endPoint.charCodeAt(0) - startPoint.charCodeAt(0);
    
        let verticalDistance = Math.abs(sectionDelta) * L + laneIdDelta * L/3;
        let horizontalDistance = (L/2 + C + C + L/2) * Math.max(Math.abs(warehouseDelta), 1);
    
        return verticalDistance + horizontalDistance;
    },

    calculateTotalDistance: function (route) { //[P1, P2, P3, ..., Pn-1, Pn] => |P1P2| + |P2P3| + ... + |Pn-1Pn|
        let totalDistance = 0;
        for (let i = 0; i < route.length - 1; i++) {
            totalDistance += this.calculateDistance(route[i], route[i+1]);
        }
        return totalDistance;
    },

    findBestRoute: function (points) {
        let subarrays = [];
        let currentWh = 'A';
        let startIndex = 0;
        points.sort();
        for(let i = 0; i < points.length; i++) {
            if(points[i][0] != currentWh) {
                console.log(points[i][0] + " is different than " + currentWh);
                subarrays.push(permute(points.slice(startIndex, i)));
                startIndex = i;
                currentWh = points[i][0];
            }
        }
        subarrays.push(permute(points.slice(startIndex, points.length)));

        subarrays[0].forEach(elemA =>
            subarrays[1].forEach(elemB =>
                subarrays[2].forEach(function(elemC) {
                    let possibleRoute = elemA.concat(elemB).concat(elemC);
                    console.log(functions.calculateTotalDistance(possibleRoute));
                })));

        subarrays.forEach(element => console.log(element));
        
        return subarrays;


    }
}

export default functions;

