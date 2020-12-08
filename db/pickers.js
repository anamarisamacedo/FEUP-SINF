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
                } else if(!pickers.manager){
                    resolve(pickers);
                }
            });
        })
    },

    submitPicker(picker, pw) {
        db.ref('pickingWaves/').orderByChild('wave').equalTo(pw).update({
            assignedPicker: picker
        }).then(() => console.log("Picker "+ assignedPicker +"has benn assigned."));
    }
}

export default pickerQueries;