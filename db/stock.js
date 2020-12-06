import { db } from '../config';
const crypto = require('crypto');

const stockDb = {
    getItems(){
        var items = null;
        return new Promise(resolve => {
        db.ref('items/').once('value', querySnapShot => {
            items = querySnapShot.val();
            if (items == null) {
                resolve('');
            } else resolve(items);
        });
    })
    },

    getItemLoc(itemRef) {
        var item = null;
        return new Promise(resolve => {
            db.ref('items/' + itemRef).once('value', querySnapShot => {
                item = querySnapShot.val();
                if (item == null) {
                    resolve('');
                } else resolve(item.loc);
            });
        })
    },

    updateItem(item){
        db.ref('items/').set({
            ref: item.itemKey,
            name: item.description
        }).then(() => console.log("Item created"));
    }
}

function hash(string) {
    return crypto.createHash('sha1').update(string).digest('hex');
}

export default stockDb;