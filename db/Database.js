import { db } from '../config';
const crypto = require('crypto');

const queries = {
    addAccount: function (email) {

        db.ref('accounts/' + hash(email)).set({
            manager: false
        }).then(() => console.log(email + "'s account was created!'"));
    },
    makeManager: function (email) {
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
    }
}

function hash(string) {
    return crypto.createHash('sha1').update(string).digest('hex');
}

export default queries;