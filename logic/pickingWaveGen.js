
var numOrdersToAnalyze = 3;

const functions = {
    generatePickingWave: function (orders, numProducts) {
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

        let itemsA = {
            /*"A11":
                {
                    qty: 2,
                    items: [{qty: 2, ref: "aq", orderID: "a12"}]
                }
            */}, itemsB = {}, itemsC = {};
        for(i = 0; i < orders.length; i++) {
            let order = orders[i];
            order.items.forEach(item => {
                let qtyLeft = item.qty - item.qtyPW;
                switch(item.loc[0]) {
                    case 'A':
                        if(item.loc in itemsA) {
                            itemsA[item.loc].qty += qtyLeft;
                            itemsA[item.loc].items.push({qty: qtyLeft, ref: item.ref, orderID: order.id});
                        }
                        else {
                            itemsA[item.loc] = {qty: qtyLeft, items: [{qty: qtyLeft, ref: item.ref, orderID: order.id}]};
                        }
                        break;
                    case 'B':
                        if(item.loc in itemsB) {
                            itemsB[item.loc].qty += qtyLeft;
                            itemsB[item.loc].items.push({qty: qtyLeft, ref: item.ref, orderID: order.id});
                        }
                        else {
                            itemsB[item.loc] = {qty: qtyLeft, items: [{qty: qtyLeft, ref: item.ref, orderID: order.id}]};
                        }
                        break;
                    case 'C':
                        if(item.loc in itemsC) {
                            itemsC[item.loc].qty += qtyLeft;
                            itemsC[item.loc].items.push({qty: qtyLeft, ref: item.ref, orderID: order.id});
                        }
                        else {
                            itemsC[item.loc] = {qty: qtyLeft, items: [{qty: qtyLeft, ref: item.ref, orderID: order.id}]};
                        }
                        break;
                }
            });
        }

        console.log(itemsA);
        console.log(itemsB);
        console.log(itemsC);

        itemsA.sort((a, b) => (a.qty > b.qty) ? -1 : 1);

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

        // 25x Item1  
        // B22 - {{ref: ..., orderId: ..},{ref: ..., orderId: ..},{ref: ..., orderId: ..},{ref: ..., orderId: ..}}




        console.log(orders);
    },
    calculatePWRatio: function(items) {
        let qty = 0.0, qtyPW = 0.0;
        items.forEach(item => {
            qty += item.qty;
            qtyPW += item.qtyPW; 
        });
        return qtyPW/qty;
    }
}

export default functions;