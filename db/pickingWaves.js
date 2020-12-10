import { db } from '../config';

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

    getAssociatedPickingWaves(picker) {
        return new Promise(resolve => {
            let pw = null;
            db.ref('pickingWaves/').orderByChild('assignedPicker').equalTo(picker).once('value', querySnapShot => {
                pw = querySnapShot.val();
                if (pw == null) {
                    resolve(false);
                } else resolve(pw);
            });
        })
    },

    submitReportAndPicked(pw, report, picked) {
        console.log(picked)
        db.ref('pickingWaves/').orderByChild('wave').equalTo(pw).once('value', function (snapshot) {
            snapshot.forEach(function(child) {
              child.ref.update({report: report});
              
            })
        })
        for (var [key, value] of picked) {
            /*db.ref('pickingWaves/').orderByChild('wave').equalTo(pw).child('items/').orderByChild('ref').equalTo(key).once('value', function (snapshot) {
                snapshot.forEach(function(child) {
                  child.ref.update({picked: value});
                }
                )
            })*/
          }
    }
}

export default pWqueries;