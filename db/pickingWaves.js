import { db } from '../config';
const crypto = require('crypto');

const pickingWaves = {
    getPickingWaves() {
        return new Promise(resolve => {
            let pw = null;
            db.ref('pickingWaves/').once('value', querySnapShot => {
                pw = querySnapShot.val();
                if (pw == null) {
                    resolve(null);
                } else resolve(pw);
            });
        })
    },
}

export default pickingWaves;