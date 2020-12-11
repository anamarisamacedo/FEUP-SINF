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
    },

    getNextPWId() {
        return new Promise(resolve => {
            db.ref('pickingWaves/').once('value', querySnapShot => {
                let id = 0;
                if(querySnapShot.val() != null) {
                    id = querySnapShot.val().length;
                }
                console.log("Size of array of queries = " + id);
                resolve(id);
            });
        });
    },

    addPickingWave: function (items) {
        this.getNextPWId().then(nextId => {

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); 
            let yyyy = today.getFullYear();

            let dayStr = dd + '/' + mm + '/' + yyyy;
            let hourStr = today.getHours() + ":" + today.getMinutes();
            console.log(items);
            db.ref('pickingWaves/' + nextId).set({
                items: items,
                status: 'pending',
                wave: nextId,
                assignedPicker: 'None',
                createDate: dayStr,
                createHour: hourStr,
                concludedDate: ' - ',
                concludedHour: ' - ',
                report: ""
            }).then(() => console.log("Picking wave " + nextId + " has been created!"));
        });
    },
}

export default pWqueries;