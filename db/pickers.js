import { db } from '../config';
const crypto = require('crypto');

const pickerQueries = {
    getPickers() {
        return new Promise(resolve => {
            let pickers = null;
            db.ref('accounts/').once('value', querySnapShot => {
                pickers = querySnapShot.val();
                if (pickers == null) {
                    resolve(false);
                } else resolve(pickers);
            });
        })
    },

    submitPicker(picker, pw) {
        db.ref('pickingWaves/').orderByChild('wave').equalTo(pw).once('value', function (snapshot){
            snapshot.forEach(function(child){
                child.ref.update({assignedPicker:picker});
                child.ref.update({status:"in progress"});
                })
            })
    }
}

export default pickerQueries;