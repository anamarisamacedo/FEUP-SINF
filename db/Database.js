import { db } from '../config';
const crypto = require('crypto');

const queries = {
    addAccount: function (email) {

        db.ref('accounts/' + hash(email)).set({
            manager: false
        }).then(() => console.log(email + "'s account was created!'"));
    },
    makeManager: function (email) {
        let hash = crypto.createHash('sha1').update(email).digest('hex');
        db.ref('accounts/' + hash(email)).update({
            manager: true
        }).then(() => console.log(email + " is now a Manager!"));
    },
    revokeManager: function (email) {
        db.ref('accounts/' + hash(email)).update({
            manager: false
        }).then(() => console.log(email + " is no longer a Manager!"));
    },
    isManager: function (email) {
        return new Promise(resolve => {
            let data = null;
            db.ref('accounts/' + hash(email)).once('value', querySnapShot => {
                data = querySnapShot.val();
                if (data == null) {
                    resolve(false);
                } else resolve(data.manager);
            });
        })
    },
    addClientOrder: function (orderId) {

        db.ref('client_orders/' + orderId).set({
            status: "WFP"
        }).then(() => console.log(orderId + " order was created!'"));
    },
    addSupplierOrder: function (orderId) {

        db.ref('supplier_orders/' + orderId).set({
            status: "WFR"
        }).then(() => console.log(orderId + " order was created!'"));
    },
    getClientOrderStatus: function (orderId) {
        return new Promise(resolve => {
            let data = null;
            db.ref("client_orders").orderByChild("orderId").equalTo("orderId").once('value', querySnapShot => {
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
            db.ref("supplier_orders").orderByChild("orderId").equalTo("orderId").once('value', querySnapShot => {
                data = querySnapShot.val();
                if (data == null) {
                    resolve(false);
                } else resolve(data.status);
            });
        })
    }
}

function hash(string) {
    return crypto.createHash('sha1').update(string).digest('hex');
}

export default queries;