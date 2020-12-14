import { db } from '../config';

const queries = {
    addClientOrder: function (orderId, orderRef) {

        db.ref('client_orders/' + orderId).set({
            status: "WFP",
            ref: orderRef,
            items: {}
        }).then(() => console.log(orderId + " order was created!'"));
    },
    addSupplierOrder: function (orderId) {

        db.ref('supplier_orders/' + orderId).set({
            status: "WFR"
        }).then(() => console.log(orderId + " order was created!'"));
    },
    getClientOrdersQtyPW: function () {
        return new Promise(resolve => {
            db.ref("client_orders/").once('value', querySnapShot => {
                let orders = querySnapShot.val();
                let ordersQtyPw = {};
                for (let order in orders) {
                    if (orders[order].status != "WFP") {
                        let items = {};
                        for (let item in orders[order].items) {
                            items[item] = orders[order].items[item].qtyPW;
                        }
                        ordersQtyPw[order] = items;
                    }
                }
                resolve(ordersQtyPw);
            });
        });
    },
    getClientOrders: function () {
        return new Promise(resolve => {
            let data = null;
            db.ref("client_orders").once('value', querySnapShot => {
                data = querySnapShot.val();
                if (data == null) {
                    resolve({});
                } else resolve(data);
            });
        })
    },
    getClientOrderRef: function (orderId) {
        return new Promise(resolve => {
            let data = null;
            db.ref("client_orders/" + orderId).once('value', querySnapShot => {
                data = querySnapShot.val();
                if (data == null) {
                    resolve(false);
                } else resolve(data.ref);
            });
        })
    },
    getSupplierOrderStatus: function (orderId) {
        return new Promise(resolve => {
            let data = null;
            db.ref("supplier_orders/" + orderId).once('value', querySnapShot => {
                data = querySnapShot.val();
                if (data == null) {
                    resolve(false);
                } else resolve(data.status);
            });
        })
    },
    updateOrder: async function (item) {
        if(item.oldQtyPW != 0) {
            db.ref('client_orders/' + item.orderID + "/items/" + item.ref).update({
                qtyPW: item.oldQtyPW + item.qty
            });
        } else {
            db.ref('client_orders/' + item.orderID).update({
                status: "Picking"
            });
            db.ref('client_orders/' + item.orderID + "/items/" + item.ref).set({
                qtyPW: item.qty
            });
        }
    },
    updateOrderStatus: function (orderID) {
        db.ref('client_orders/' + orderID).update({
            status: "Shipping"
        });
    },
}

export default queries;