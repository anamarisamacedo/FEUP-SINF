import queries from "../db/orders";
import pwQueries from "../db/pickingWaves";

var numOrdersToAnalyze = 3;
var whToInt = {
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
}

const functions = {
    generatePickingWave: function (orders, numProducts) {

        orders.sort((a, b) => {
            if(a.pwRatio == b.pwRatio) {
                return (a.date < b.date) ? -1 : 1;
            } else {
                return (a.pwRatio > b.pwRatio) ? -1 : 1;
            }
        });

        console.log(orders);

        let i = 0,
            totalNumProducts = 0;
        for (i = 0; i < orders.length; i++) {
            orders[i].items.forEach(item => {
                totalNumProducts += item.qty - item.qtyPW;
            });
            if (totalNumProducts > numProducts) {
                break;
            }
        }
        orders = orders.slice(0, Math.min(orders.length, Math.max(i + 1, numOrdersToAnalyze)));

        let itemsA = [],
            itemsB = [],
            itemsC = [];

        for (i = 0; i < orders.length; i++) {
            let order = orders[i];
            order.items.forEach(item => {
                let qtyLeft = item.qty - item.qtyPW;
                let arrayLocPos = whToInt[item.loc];
                switch (item.loc[0]) {
                    case 'A':
                        if (typeof itemsA[arrayLocPos] !== 'undefined') {
                            itemsA[arrayLocPos].qty += qtyLeft;
                            itemsA[arrayLocPos].items.push({
                                wh: item.loc,
                                oldQtyPW: item.qtyPW,
                                qty: qtyLeft,
                                ref: item.ref,
                                orderID: order.id,
                                name: item.name
                            });
                        } else {
                            itemsA[arrayLocPos] = {
                                qty: qtyLeft,
                                items: [{
                                    wh: item.loc,
                                    oldQtyPW: item.qtyPW,
                                    qty: qtyLeft,
                                    ref: item.ref,
                                    orderID: order.id,
                                    name: item.name
                                }]
                            };
                        }
                        break;
                    case 'B':
                        if (typeof itemsB[arrayLocPos] !== 'undefined') {
                            itemsB[arrayLocPos].qty += qtyLeft;
                            itemsB[arrayLocPos].items.push({
                                wh: item.loc,
                                oldQtyPW: item.qtyPW,
                                qty: qtyLeft,
                                ref: item.ref,
                                orderID: order.id,
                                name: item.name
                            });
                        } else {
                            itemsB[arrayLocPos] = {
                                qty: qtyLeft,
                                items: [{
                                    wh: item.loc,
                                    oldQtyPW: item.qtyPW,
                                    qty: qtyLeft,
                                    ref: item.ref,
                                    orderID: order.id,
                                    name: item.name
                                }]
                            };
                        }
                        break; 
                    case 'C':
                        if (typeof itemsC[arrayLocPos] !== 'undefined') {
                            itemsC[arrayLocPos].qty += qtyLeft;
                            itemsC[arrayLocPos].items.push({
                                wh: item.loc,
                                oldQtyPW: item.qtyPW,
                                qty: qtyLeft,
                                ref: item.ref,
                                orderID: order.id,
                                name: item.name
                            });
                        } else {
                            itemsC[arrayLocPos] = {
                                qty: qtyLeft,
                                items: [{
                                    wh: item.loc,
                                    oldQtyPW: item.qtyPW,
                                    qty: qtyLeft,
                                    ref: item.ref,
                                    orderID: order.id,
                                    name: item.name
                                }]
                            };
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

        let stop = false,
            stopA = false,
            stopB = false,
            stopC = false;
        let n = 0;
        i = 0;
        let numItemsChosen = 0;
        let qty;
        let selectedItems = [];

        while (!stop && (!stopA || !stopB || !stopC)) {
            console.log("CHOSEN = " + numItemsChosen);
            switch (n % 3) {
                case 0:
                    if (i < itemsA.length) {
                        itemsA[i].items.forEach(item => {
                            if (!stop && item.qty != 0) {
                                qty = item.qty;
                                if (numItemsChosen + qty >= numProducts) {
                                    stop = true;
                                    qty = numProducts - numItemsChosen;
                                    item.qty = qty;
                                } else numItemsChosen += qty;
                                selectedItems.push({
                                    defaultWarehouse: item.wh,
                                    name: item.name,
                                    picked: 0,
                                    qty: item.qty,
                                    ref: item.ref,
                                    orderID: item.orderID,
                                    oldQtyPW: item.oldQtyPW,
                                });
                                console.log(item);
                                queries.updateOrder(item);
                            }
                        });
                    } else {
                        stopA = true;
                    }
                    break;
                case 1:
                    if (i < itemsB.length) {
                        itemsB[i].items.forEach(item => {
                            if (!stop && item.qty != 0) {
                                qty = item.qty;
                                if (numItemsChosen + qty >= numProducts) {
                                    stop = true;
                                    qty = numProducts - numItemsChosen;
                                    item.qty = qty;
                                } else numItemsChosen += qty;
                                selectedItems.push({
                                    defaultWarehouse: item.wh,
                                    name: item.name,
                                    picked: 0,
                                    qty: item.qty,
                                    ref: item.ref,
                                    orderID: item.orderID,
                                    oldQtyPW: item.oldQtyPW,
                                });
                                queries.updateOrder(item);
                            }
                        });
                    } else {
                        stopB = true;
                    }
                    break;
                case 2:
                    if (i < itemsC.length) {
                        itemsC[i].items.forEach(item => {
                            if (!stop && item.qty != 0) {
                                qty = item.qty;
                                if (numItemsChosen + qty >= numProducts) {
                                    stop = true;
                                    qty = numProducts - numItemsChosen;
                                    item.qty = qty;
                                } else numItemsChosen += qty;
                                selectedItems.push({
                                    defaultWarehouse: item.wh,
                                    name: item.name,
                                    picked: 0,
                                    qty: item.qty,
                                    ref: item.ref,
                                    orderID: item.orderID,
                                    oldQtyPW: item.oldQtyPW,
                                });
                                queries.updateOrder(item);
                            }
                        });
                    } else {
                        stopC = true;
                    }
                    i++;
                    break;
            }
            n++;
        }

        let targetOrders = [];
        selectedItems.forEach(item => {
            targetOrders.push(item.orderID);
        });
        targetOrders = [...new Set(targetOrders)];
        let closesOrders = [];

        targetOrders.forEach(orderID => {
            let order = orders.filter((order) => order.id == orderID)[0];
            let qtyNeeded = order.totalNumItems;
            order.items.forEach(item => {
                qtyNeeded -= item.qtyPW;
            });
            selectedItems.forEach(item => {
                if(item.orderID == orderID) {
                    qtyNeeded -= item.qty;
                }
            });
            if(qtyNeeded == 0) {
                closesOrders.push(orderID);
            }
        })


        return new Promise(resolve => {
            if(selectedItems.length > 0)
                resolve(pwQueries.addPickingWave(selectedItems, closesOrders).then(() => {}));
            else resolve();
        });
    },
    calculatePWRatio: function (items) {
        let qty = 0.0,
            qtyPW = 0.0;
        items.forEach(item => {
            qty += item.qty;
            qtyPW += item.qtyPW;
        });
        return qtyPW / qty;
    },

}

export default functions;