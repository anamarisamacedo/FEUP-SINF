import { db } from '../config';
const crypto = require('crypto');

const pWqueries = {
    getPickingWaves() {
        return new Promise(resolve => {
            let pw = null;
            db.ref('pickingWaves/').once('value', querySnapShot => {
                pw = querySnapShot.val();
                if (pw == null) {
                    resolve(false);
                } else resolve(pw);
            });
        })
    },

    submitReport(pw, report) {
        db.ref('pickingWaves/').orderByChild('wave').equalTo(pw).update({
            report: report
        }).then(() => console.log(email + "'s account was created!'"));
    }
}

export default pWqueries;