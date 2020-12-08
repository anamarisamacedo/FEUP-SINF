
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
        console.log(points.length);
        let subarrays = [];
        let currentWh = 'A';
        let startIndex = 0;
        points.sort();
        let bestRoute = points;
        let minDistance = functions.calculateTotalDistance(points);
        
        for(let i = 0; i < points.length; i++) {
            if(points[i][0] != currentWh) {
                subarrays.push(permute(points.slice(startIndex, i)));
                console.log(permute(points.slice(startIndex, i)).length);
                startIndex = i;
                currentWh = points[i][0];
            }
        }
        subarrays.push(permute(points.slice(startIndex, points.length)));

        //subarrays[0].forEach(elemA => console.log(elemA));

        subarrays[0].forEach(elemA =>
            subarrays[1].forEach(elemB =>
                subarrays[2].forEach(function(elemC) {
                    let possibleRoute = elemA.concat(elemB).concat(elemC);
                    let dist = functions.calculateTotalDistance(possibleRoute);
                    if(dist < minDistance) {
                        minDistance = dist;
                        bestRoute = possibleRoute;
                    }
                })));

        console.log("Min distance = " + minDistance);
        console.log("Best route: " + bestRoute);
        
        return bestRoute;


    }
}

export default functions;

