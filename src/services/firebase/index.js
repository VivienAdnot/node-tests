import admin from 'firebase-admin';
import { firebaseCert, firebaseConfig } from './index.const';

console.log('will init firebase');

admin.initializeApp({
    credential: admin.credential.cert(firebaseCert),
    databaseURL: firebaseConfig.api.databaseURL
});

const sendNotification = (token, message, messagingOptions = {}) => {

    return admin
        .messaging()
        .sendToDevice(token, message, messagingOptions);

};

export default sendNotification;
