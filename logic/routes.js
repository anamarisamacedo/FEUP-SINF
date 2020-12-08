
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

function permute(xs) {
    let ret = [];
  
    for (let i = 0; i < xs.length; i = i + 1) {
      let rest = permute(xs.slice(0, i).concat(xs.slice(i + 1)));
  
      if(!rest.length) {
        ret.push([xs[i]])
      } else {
        for(let j = 0; j < rest.length; j = j + 1) {
          ret.push([xs[i]].concat(rest[j]))
        }
      }
    }
    return ret;
  }

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
    
        let verticalDistance = Math.abs(sectionDelta * L + laneIdDelta * L/3);
        let horizontalDistance = (L/2 + C + C + L/2) * Math.max(Math.abs(warehouseDelta), 1);

        return verticalDistance + horizontalDistance;
    },

    calculateTotalDistance: function (route) { //[P1, P2, P3, ..., Pn-1, Pn] => |P1P2| + |P2P3| + ... + |Pn-1Pn|
        let totalDistance = 0;
        for (let i = 0; i < route.length - 1; i++) {
            totalDistance += this.calculateDistance(route[i], route[i+1]);
        }
        totalDistance += this.calculateDistance(EntryPoint, route[0]) 
                + this.calculateDistance(route[route.length - 1], OutPoint);
        return totalDistance;
    },

    findBestRoute: function (points) {

        let startTime = performance.now();
        let subarrays = [];
        let currentWh = 'A';
        let startIndex = 0;
        points.sort();
        let bestRoute = points;
        let minDistance = functions.calculateTotalDistance(points);
                
        
        for(let i = 0; i < points.length; i++) {
            if(points[i][0] != currentWh) {
                if(i != 0)
                    subarrays.push(permute(points.slice(startIndex, i)));
                startIndex = i;
                currentWh = points[i][0];
            }
        }
        subarrays.push(permute(points.slice(startIndex, points.length)));


        let len = subarrays.length;
        for(let i = 0; i < 3 - len; i++) {
            subarrays.push([[" "]]);
        }

        let OutOfTimeException = {};

        try {
        subarrays[0].forEach(elemA =>
            subarrays[1].forEach(elemB =>
                subarrays[2].forEach(function(elemC) {
                    if(performance.now() - startTime > 10000) {
                        throw OutOfTimeException;
                    }
                    let possibleRoute = elemA.concat(elemB).concat(elemC);
                    possibleRoute = possibleRoute.filter(function (elem) {
                        return elem != " ";
                    });
                    let firstPoint = possibleRoute[0];
                    let lastPoint = possibleRoute[possibleRoute.length - 1];

                    let dist = functions.calculateTotalDistance(possibleRoute);
                    if(dist < minDistance) {
                        minDistance = dist;
                        bestRoute = possibleRoute;
                    }
                })));
            } catch (e) {
                if(e != OutOfTimeException) {
                    throw e;
                }
            }


        console.log("Min distance = " + minDistance);
        console.log("Best route: " + bestRoute);
        
        return bestRoute;

    }
}

export default functions;

