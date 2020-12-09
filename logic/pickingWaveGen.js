
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
            "A11":
                {
                    qty: 2,
                    items: [{qty: 2, ref: "aq", orderID: "a12"}]
                }
            }, itemsB = {}, itemsC = {};
        let itemsATotal = 0, itemsBTotal = 0, itemsCTotal = 0;
        for(i = 0; i < orders.length; i++) {
            let order = orders[i];
            order.items.forEach(item => {
                switch(item.loc[0]) {
                    case 'A':
                        itemsA[item.loc].items.push();
                        break;
                    case 'B':
                        break;
                    case 'C':
                        break;
                }
            })
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