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
        db.ref('pickingWaves/').orderByChild('wave').equalTo(pw).once('value', function (snapshot) {
            snapshot.forEach(function(child) {
                for (var [key, value] of picked) {
                    child.child('items/').forEach((item) =>{
                        if(item.val().ref == key){
                            item.ref.update({picked: value})
                        }
                    });
                    }
              child.ref.update({report: report});
              
            })
        })
    }
}

export default pWqueries;