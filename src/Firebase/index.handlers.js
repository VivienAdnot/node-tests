import sendNotification from '../services/firebase/';

exports.pushNotificationToken = (req, res, next) => {

    const { token, message, messageOptions } = req.body;

    sendNotification(token, message, messageOptions)
        .then(result => console.log('success', result))
        .catch(err => console.error('ERROR', err));

    next();

};
