import { db } from '../config';
import queries from './Database';

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

    getPWNum(picker) {
        return new Promise(resolve => {
            let pw = null;
            db.ref('pickingWaves/').orderByChild('assignedPicker').equalTo(picker).once('value', querySnapShot => {
                pw = querySnapShot.numChildren();
                resolve(pw);
            });
        })
    },
    submitReportAndPicked(pw, report, picked, wave, pickingWave) {
        let concluded = true;
        wave.forEach(section => {
            section.items.forEach(item => {
                if (item.qty != picked.get(item.ref)) {
                    concluded = false;
                }
            })
        }); 
        concluded = true; 
        db.ref('pickingWaves/').orderByChild('wave').equalTo(pw).once('value', function (snapshot) {
            snapshot.forEach(function (child) {
                for (var [key, value] of picked) {
                    child.child('items/').forEach((item) => {
                        if (item.val().ref == key) {
                            item.ref.update({ picked: value })
                        }
                    });
                }
                if (concluded) {
                    child.ref.update({ report: report, status: "concluded" });
                    if ("closesOrders" in pickingWave) {
                        pickingWave.closesOrders.forEach(orderID => {
                            queries.updateOrderStatus(orderID);
                        })
                    }
                }
                else child.ref.update({ report: report });
            })
        })
    },

    getNextPWId() {
        return new Promise(resolve => {
            db.ref('pickingWaves/').once('value', querySnapShot => {
                let id = 0;
                if (querySnapShot.val() != null) {
                    id = querySnapShot.val().length;
                }
                console.log("Size of array of queries = " + id);
                resolve(id);
            });
        });
    },

    addPickingWave: function (items, closesOrders) {
        console.log(closesOrders);
        return new Promise(() => {
            this.getNextPWId().then(nextId => {
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                if (dd.length == 1) {
                    dd = "0" + dd;
                }
                let mm = String(today.getMonth() + 1).padStart(2, '0');
                if (mm.length == 1) {
                    mm = "0" + mm;
                }
                let yyyy = today.getFullYear();

                let dayStr = dd + '/' + mm + '/' + yyyy;
                let hourStr = (today.getHours() < 10 ? "0" : "") + today.getHours() + ":" + (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
                console.log(items);
                db.ref('pickingWaves/' + nextId).set({
                    items: items,
                    status: 'pending',
                    wave: nextId,
                    assignedPicker: 'None',
                    createdDate: dayStr,
                    createdHour: hourStr,
                    concludedDate: ' - ',
                    concludedHour: ' - ',
                    report: "",
                    closesOrders: closesOrders,
                }).then(() => console.log("Picking wave " + nextId + " has been created!"));
            });
        });
    }
}

export default pWqueries;