import {
    db
} from '../config';
import queries from './orders';
import jasminConstants from "../services/jasminConstants";
import token from "../services/token";
import shipping from "../services/shipping";
const axios = require("axios");

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
        let {dayStr, hourStr} = this.getCurrentTime();
        db.ref('pickingWaves/').orderByChild('wave').equalTo(pw).once('value', function (snapshot) {
            snapshot.forEach(function (child) {
                for (var [key, value] of picked) {
                    child.child('items/').forEach((item) => {
                        if (item.val().ref == key) {
                            item.ref.update({
                                picked: value
                            })
                        }
                    });
                }
                if (concluded) {
                    child.ref.update({
                        report: report,
                        status: "concluded",
                        concludedDate: dayStr,
                        concludedHour: hourStr,
                    });
                    if ("closesOrders" in pickingWave) {
                        pickingWave.closesOrders.forEach(orderID => {
                            queries.updateOrderStatus(orderID);
                        })
                    }
                } else child.ref.update({
                    report: report
                });
            })
        })
        if (concluded)
            this.stockTransfer(wave, pickingWave);
    },

    stockTransfer(wave, pickingWave) {
        const accessToken = token.getToken();
        const apiUrl =
            jasminConstants.url +
            "/api/" +
            jasminConstants.accountKey +
            "/" +
            jasminConstants.subscriptionKey +
            "/materialsmanagement/stockTransferOrders";

        wave.forEach(async section => {
            if (section.items.length != 0) {
                let body = {
                    company: "SINFP",
                    sourceWarehouse: section.section_name,
                    targetWarehouse: "OP",
                    UnloadingCountry: "PT",
                    documentLines: [],
                }

                section.items.forEach(item => {
                    body.documentLines.push({materialsItem: item.ref, quantity: item.qty});
                })

                console.log(body);

                await axios({
                    method: "POST",
                    url: apiUrl,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken,
                    },
                    data: JSON.stringify(body)
                })
                .then((response) => console.log(response.status));
            }
        });

        if ("closesOrders" in pickingWave) {
            pickingWave.closesOrders.forEach(orderID => {
                queries.getClientOrderRef(orderID).then(orderRef => shipping.generateDeliveryNote(orderRef));
            })
        }

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

    addPickingWave: function (items, closesOrders, route) {
        console.log(closesOrders);
        return new Promise(() => {
            this.getNextPWId().then(nextId => {
                let {dayStr, hourStr} = this.getCurrentTime();
                console.log(items);
                db.ref('pickingWaves/' + nextId).set({
                    route: route,
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
    },

    getCurrentTime() {
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
        return {dayStr, hourStr};
    }
}

export default pWqueries;