import { sendNotification, sendGroupNotification } from '../services/firebase/';

exports.pushNotificationToken = (req, res, next) => {

    const { token, message, messageOptions } = req.body;

    sendNotification(token, message, messageOptions)
        .then(result => console.log('success', result))
        .catch(err => console.error('ERROR', err));

    next();

};

exports.sendToDeviceGroup = (req, res, next) => {

    const { notificationKey, message, messageOptions } = req.body;

    sendGroupNotification(notificationKey, message, messageOptions)
        .then((result) => {

            console.log('sendToDeviceGroup', result);

            res.data = result;
            next();

        });

    next();

};
