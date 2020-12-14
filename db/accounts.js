import { db } from '../config';

const queries = {
    addAccount: function (email) {

        db.ref('accounts/' + getUsername(email)).set({
            manager: false
        }).then(() => console.log(email + "'s account was created!'"));
    },
    makeManager: function (email) {
        db.ref('accounts/' + getUsername(email)).update({
            manager: true
        }).then(() => console.log(email + " is now a Manager!"));
    },
    revokeManager: function (email) {
        db.ref('accounts/' + getUsername(email)).update({
            manager: false
        }).then(() => console.log(email + " is no longer a Manager!"));
    },
    isManager: function (email) {
        return new Promise(resolve => {
            let data = null;
            db.ref('accounts/' + getUsername(email)).once('value', querySnapShot => {
                data = querySnapShot.val();
                if (data == null) {
                    resolve(false);
                } else resolve(data.manager);
            });
        })
    },
    getUsername: function (email) {
        return getUsername(email);
    },
    assignManager: function (username) {
        db.ref('accounts/' + username).update({
            manager: true
        }).then(() => console.log(username + " is now a Manager!"));
    },
    unssignManager: function (username) {
        db.ref('accounts/' + username).update({
            manager: false
        }).then(() => console.log(username + " is no longer a Manager!"));
    },
    validateAuthCode: function (authCode) {
        return new Promise(resolve => {
            db.ref('auth').once('value', querySnapShot => {
                let data = querySnapShot.val();
                if (data == null) {
                    resolve(true);
                } else resolve(authCode == data.authCode);
            });
        })
    }
}

function getUsername(string) {
    return replaceDot(string.substring(0, string.indexOf("@")));
}
function replaceDot(string) {
    return string.replace('.', '');
}

export default queries;