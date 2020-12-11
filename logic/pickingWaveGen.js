import queries from "../db/Database";


var numOrdersToAnalyze = 3;
/*var whToInt = {
    'A11' : 0,
    'A12' : 1,
    'A21' : 2,
    'A22' : 3,
    'A31' : 4,
    'A32' : 5,
    'B11' : 0,
    'B12' : 1,
    'B21' : 2,
    'B22' : 3,
    'B31' : 4,
    'B32' : 5,
    'C11' : 0,
    'C12' : 1,
    'C21' : 2,
    'C22' : 3,
    'C31' : 4,
    'C32' : 5
}*/

var whToInt = {
    'A1' : 0,
    'A2' : 1,
    'A3' : 2,
    'B1' : 0,
    'B2' : 1,
    'B3' : 2,
    'C1' : 0,
    'C2' : 1,
    'C3' : 2,
}


const functions = {
    generatePickingWave: function (orders, numProducts) {
        console.log(orders);
        orders.sort((a, b) => (a.pwRatio > b.pwRatio) ? -1 : 1);
        let i = 0, totalNumProducts = 0;
        for(i = 0; i < orders.length; i++) {
            orders[i].items.forEach(item => {
                totalNumProducts += item.qty - item.qtyPW;
            });
            if(totalNumProducts > numProducts) {
                break;
            }
        }
        orders = orders.slice(0, Math.min(orders.length, Math.max(i + 1, numOrdersToAnalyze)));

        /*let testArr = [];
        testArr[0] = 50;
        testArr[1] = 24;
        testArr[2] = 35;
        testArr[5] = 21;
        console.log(testArr);
        testArr.sort((a, b) => (a > b) ? -1 : 1);
        console.log("ARRAY = " + testArr);*/   // TODO: REMOVER VAZIOS!

        let itemsA = [
            /*"A11":
                {
                    qty: 2,
                    items: [{qty: 2, ref: "aq", orderID: "a12"}]
                }
            */], itemsB = [], itemsC = [];
        for(i = 0; i < orders.length; i++) {
            let order = orders[i];
            order.items.forEach(item => {
                let qtyLeft = item.qty - item.qtyPW;
                let arrayLocPos = whToInt[item.loc];
                switch(item.loc[0]) {  
                    case 'A':
                        if(typeof itemsA[arrayLocPos] !== 'undefined') {
                            itemsA[arrayLocPos].qty += qtyLeft;
                            itemsA[arrayLocPos].items.push({wh: item.loc, oldQtyPW: item.qtyPW, qty: qtyLeft, ref: item.ref, orderID: order.id});
                        }
                        else {
                            itemsA[arrayLocPos] = {qty: qtyLeft, items: [{wh: item.loc, oldQtyPW: item.qtyPW, qty: qtyLeft, ref: item.ref, orderID: order.id}]};
                        }
                        break;
                    case 'B':
                        if(typeof itemsB[arrayLocPos] !== 'undefined') {
                            itemsB[arrayLocPos].qty += qtyLeft;
                            itemsB[arrayLocPos].items.push({wh: item.loc, oldQtyPW: item.qtyPW, qty: qtyLeft, ref: item.ref, orderID: order.id});
                        }
                        else {
                            itemsB[arrayLocPos] = {qty: qtyLeft, items: [{wh: item.loc, oldQtyPW: item.qtyPW, qty: qtyLeft, ref: item.ref, orderID: order.id}]};
                        }
                        break;
                    case 'C':
                        if(typeof itemsC[arrayLocPos] !== 'undefined') {
                            itemsC[arrayLocPos].qty += qtyLeft;
                            itemsC[arrayLocPos].items.push({wh: item.loc, oldQtyPW: item.qtyPW, qty: qtyLeft, ref: item.ref, orderID: order.id});
                        }
                        else {
                            itemsC[arrayLocPos] = {qty: qtyLeft, items: [{wh: item.loc, oldQtyPW: item.qtyPW, qty: qtyLeft, ref: item.ref, orderID: order.id}]};
                        }
                        break;
                }
            });
        }

        console.log(itemsA);
        console.log(itemsB);
        console.log(itemsC);

        itemsA.sort((a, b) => (a.qty > b.qty) ? -1 : 1);
        itemsB.sort((a, b) => (a.qty > b.qty) ? -1 : 1);
        itemsC.sort((a, b) => (a.qty > b.qty) ? -1 : 1);

        itemsA = itemsA.filter(elem => {
            return elem != {};
        });
        itemsB = itemsB.filter(elem => {
            return elem != {};
        });
        itemsC = itemsC.filter(elem => {
            return elem != {};
        });
        
        let stop = false, stopA = false, stopB = false, stopC = false;
        let n = 0;
        i = 0;
        let numItemsChosen = 0;
        let qty;

        while(!stop && (!stopA || !stopB || !stopC)) {
            console.log("NUM ITEMS CHOSEN, NUM PRODUCTS = " + numItemsChosen + "   " + numProducts);
            switch(n % 3) {
                case 0:
                    if (i < itemsA.length) {
                        itemsA[i].items.forEach(item => {
                            qty = item.qty;
                            if (numItemsChosen + qty >= numProducts) {
                                stop = true;
                                qty = numProducts - numItemsChosen;
                                item.qty = qty;
                            } else numItemsChosen += qty;
                            queries.updateOrder(item);
                        });
                    } else {
                        stopA = true;
                    }
                    break;
                case 1:
                    if (i < itemsB.length) {
                        itemsB[i].items.forEach(item => {
                            qty = item.qty;
                            if (numItemsChosen + qty >= numProducts) {
                                stop = true;
                                qty = numProducts - numItemsChosen;
                                item.qty = qty;
                            } else numItemsChosen += qty;
                            queries.updateOrder(item);
                        });
                    } else {
                        stopB = true;
                    }
                    break;
                case 2:
                    if (i < itemsC.length) {
                        itemsC[i].items.forEach(item => {
                            qty = item.qty;
                            if (numItemsChosen + qty >= numProducts) {
                                stop = true;
                                qty = numProducts - numItemsChosen;
                                item.qty = qty;
                            } else numItemsChosen += qty;
                            queries.updateOrder(item);
                        });
                    } else {
                        stopC = true;
                    }
                    i++;
                    break;
            }
            n++;
        }

        // numProducts = 25
        // Order 1 : {Item1 x20  ,  Item2 x40}
        // Order 2 : {Item1 x9  ,  Item2 x15}


        // A31     length 10      A12 item.loc   array."item.loc" array.A12
        // A32     length 7
        // A21     length 5

        // B31     length 14
        // B32     length 11
        // B21     length 8

        // C31     length 17
        // C32     length 14
        // C21     length 13


        // while 0 1 2 3 4 5 6 7

        // 25x Item1  
        // B22 - {{ref: ..., orderId: ..},{ref: ..., orderId: ..},{ref: ..., orderId: ..},{ref: ..., orderId: ..}}
    },
    calculatePWRatio: function(items) {
        let qty = 0.0, qtyPW = 0.0;
        items.forEach(item => {
            qty += item.qty;
            qtyPW += item.qtyPW; 
        });
        return qtyPW/qty;
    },
    
}

export default functions;