import * as firebase from 'firebase';
require('firebase/auth');

class Fire
{
    constructor()
    {
        this.init()
        this.checkAuth()
    }

    init = () =>
    {
        if(!firebase.apps.length) 
        {
            firebase.initializeApp
            ({
                apiKey: "AIzaSyDgJ2Ltp1MLxnILJNlcQ3hkwiQ0FiP3nnc",
                authDomain: "chat-app-3995c.firebaseapp.com",
                databaseURL: "https://chat-app-3995c.firebaseio.com",
                projectId: "chat-app-3995c",
                storageBucket: "chat-app-3995c.appspot.com",
                messagingSenderId: "441036034773",
                appId: "1:441036034773:web:39e5e9abc79ea98eb7885c",
                measurementId: "G-WZEPPTJ3FS"
            });
        }
    };

    checkAuth = () => 
    {
        firebase.auth().onAuthStateChanged(user => 
        {
            if(!user) 
            {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages =>
    {
        messages.forEach(item => 
        {
            const message = 
            {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }
            this.db.push(message)
        });
    };

    parse = message => 
    {
        const {user, text, timestamp} = message.val()
        const {key: _id} = message
        const createdAt = new Date(timestamp)

        return{
            _id,
            createdAt,
            text,
            user,
        };
    }

    get = callback =>
    {
        this.db.on
        (
            'child_added', 
            snapshot => callback(this.parse(snapshot))
        );
    }

    off()
    {
        this.db.off()
    }

    get db()
    {
        return firebase.database().ref("messages");
    }

    get uid()
    {
        return (firebase.auth().currentUser || {}).uid
    }
}

export default new Fire();

// firebase.auth()
//   .signInAnonymously()
//   .then(credential => {
//     if (credential) {
//       console.log('default app user ->', credential.user.toJSON());
//     }
//   });