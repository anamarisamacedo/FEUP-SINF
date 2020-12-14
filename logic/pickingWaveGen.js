import queries from "../db/orders";
import pwQueries from "../db/pickingWaves";
import Functions from './routes';


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

        let i = 0,
            totalNumProducts = 0;
        for (i = 0; i < orders.length; i++) {
            if(orders.pwRatio == 1) {
                continue;
            } 
            orders[i].items.forEach(item => {
                totalNumProducts += item.qty - item.qtyPW;
            });
            if (totalNumProducts > numProducts) {
                break;
            }
        }
        orders = orders.slice(0, Math.min(orders.length, Math.max(i + 1, numOrdersToAnalyze)));

        console.log(orders);

        let itemsA = [],
            itemsB = [],
            itemsC = [];

        for (i = 0; i < orders.length; i++) {
            let order = orders[i];
            if(order.pwRatio == 1) {
                continue;
            } 
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

        let selectedItemsBundledUp = [];
        /*selectedItems.forEach(item => {
            let filtered = selectedItemsBundledUp.filter(itemF => {
                return itemF.ref == item.ref;
            })
            if (filtered.length == 0) {
                selectedItemsBundledUp.push(item);
            } else {
                let itemFiltered = filtered[0];
                selectedItemsBundledUp.forEach(itemB => {
                    if (itemB.ref == itemFiltered.ref)
                    itemB.qty += item.qty;
                })
            }
        });*/
        
        selectedItems.sort((a, b) => {
            return (a.ref < b.ref) ? -1 : 1;
        });
        
        qty = 0;
        let item;
        if (selectedItems.length != 0)
            item = _.cloneDeep(selectedItems[0]);
        for (let i = 0; i < selectedItems.length; i++) {
            let currItem = _.cloneDeep(selectedItems[i]);
            if (currItem.ref != item.ref && i != 0) {
                item.qty = qty;
                selectedItemsBundledUp.push(item);
                qty = currItem.qty;
                item = _.cloneDeep(currItem);
            } else {
                qty += currItem.qty;
            }
        }
        item.qty = qty;
        selectedItemsBundledUp.push(item);

        let targetOrders = [];
        let targetSections = [];
        selectedItemsBundledUp.forEach(item => {
            targetSections.push(item.defaultWarehouse);
            targetOrders.push(item.orderID);
        });
        targetOrders = [...new Set(targetOrders)];
        targetSections = [...new Set(targetSections)];
        let closesOrders = [];

        targetOrders.forEach(orderID => {
            let order = orders.filter((order) => order.id == orderID)[0];
            let qtyNeeded = order.totalNumItems;
            order.items.forEach(item => {
                qtyNeeded -= item.qtyPW;
            });
            selectedItemsBundledUp.forEach(item => {
                if(item.orderID == orderID) {
                    qtyNeeded -= item.qty;
                }
            });
            if(qtyNeeded == 0) {
                closesOrders.push(orderID);
            }
        })

        return new Promise(resolve => {
            if(selectedItemsBundledUp.length > 0) {
                let route = Functions.findBestRoute(targetSections);
                console.log(route);
                resolve(pwQueries.addPickingWave(selectedItemsBundledUp, closesOrders, route).then(() => {}));
            }
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