import { db } from '../config';

const queries = {
    addAccount: function (email) {

        db.ref('accounts/' + getUsername(email)).set({
            manager: false
        }).then(() => console.log(email + "'s account was created!'"));
    },
    makeManager: function (email) {
        db.ref('accounts/' + getUsername(email)).update({
            manager: true
        }).then(() => console.log(email + " is now a Manager!"));
    },
    revokeManager: function (email) {
        db.ref('accounts/' + getUsername(email)).update({
            manager: false
        }).then(() => console.log(email + " is no longer a Manager!"));
    },
    isManager: function (email) {
        return new Promise(resolve => {
            let data = null;
            db.ref('accounts/' + getUsername(email)).once('value', querySnapShot => {
                data = querySnapShot.val();
                if (data == null) {
                    resolve(false);
                } else resolve(data.manager);
            });
        })
    },
    addClientOrder: function (orderId) {

        db.ref('client_orders/' + orderId).set({
            status: "WFP",
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
    getClientOrderStatus: function (orderId) {
        return new Promise(resolve => {
            let data = null;
            db.ref("client_orders/" + orderId).once('value', querySnapShot => {
                data = querySnapShot.val();
                if (data == null) {
                    resolve(false);
                } else resolve(data.status);
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
    sleep : function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
    updateOrder: async function (item) {
        await queries.sleep(2000);
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
    getUsername: function (email) {
        return getUsername(email);
    },
    assignManager: function (username) {
        db.ref('accounts/' + username).update({
            manager: true
        }).then(() => console.log(username + " is now a Manager!"));
    },
    unssignManager: function (username) {
        db.ref('accounts/' + username).update({
            manager: false
        }).then(() => console.log(username + " is no longer a Manager!"));
    },
}

function getUsername(string) {
    return replaceDot(string.substring(0, string.indexOf("@")));
}
function replaceDot(string) {
    return string.replace('.', '');
}

export default queries;