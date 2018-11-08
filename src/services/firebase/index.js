import admin from 'firebase-admin';
import { firebaseCert, firebaseConfig } from './index.const';

console.log('will init firebase');

admin.initializeApp({
    credential: admin.credential.cert(firebaseCert),
    databaseURL: firebaseConfig.api.databaseURL
});

export const sendNotification = (token, message, messagingOptions = {}) => {

    return admin
        .messaging()
        .sendToDevice(token, message, messagingOptions);

};

export const sendGroupNotification = (notificationKey, message, messagingOptions = {}) => {

    return admin
        .messaging()
        .sendToDeviceGroup(notificationKey, message, messagingOptions);

};
