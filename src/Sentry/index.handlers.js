import Boom from 'boom';
import raven from 'raven';
import admin from './firebase-admin';

const funcWillThrow = () => {

    throw Error('inside func');

};

const asyncWillRejectIndirect = () => {

    try {

        funcWillThrow();

    } catch (err) {

        return Promise.reject(err);

    }

    return Promise.resolve();

};

const asyncWillRejectDirect1 = () => {

    return Promise.reject(new Error('reject new error'));

};

const asyncWillRejectDirect2 = () => {

    return Promise.reject(Error('reject new error'));

};

const asyncWillRejectDirect3 = () => {

    return new Promise((resolve, reject) => {

        throw new Error('reject new error inside promise');

    });

};

const asyncWillRejectDirect4 = () => {

    return Promise.reject(Boom.unauthorized('test boom unauthorized'));

};

exports.sentryTest1 = (req, res, next) => {

    throw Error('inside handler');

    next();

};

exports.sentryTest2 = (req, res, next) => {

    try {

        funcWillThrow();

    } catch (err) {

        console.log('thrown');

    }

    next();

};

exports.sentryTest3 = (req, res, next) => {

    asyncWillRejectIndirect()
        .then(() => {

            console.log('success');
            next();

        })
        .catch(() => {

            console.log('caught 3');
            next();

        });

};

exports.sentryTest4 = (req, res, next) => {

    asyncWillRejectDirect1()
        .then(() => {

            console.log('success');
            next();

        })
        .catch(() => {

            console.log('caught 4');
            next();

        });

};

exports.sentryTest5 = (req, res, next) => {

    asyncWillRejectDirect2()
        .then(() => {

            console.log('success');
            next();

        })
        .catch(() => {

            console.log('caught 5');
            next();

        });

};

exports.sentryTest6 = (req, res, next) => {

    asyncWillRejectDirect3()
        .then(() => {

            console.log('success');
            next();

        })
        .catch(() => {

            console.log('caught 6');
            next();

        });

};

exports.sentryTest7 = (req, res, next) => {

    asyncWillRejectDirect4()
        .then(() => {

            console.log('success');
            next();

        })
        .catch(() => {

            console.log('caught 7');
            next();

        });

};

exports.sentryTest8 = (req, res, next) => {

    asyncWillRejectDirect4()
        .then(() => {

            console.log('success');
            next();

        })
        .catch(next);

};

exports.sentryTest9 = (req, res, next) => {

    admin.initializeApp();

    Promise.reject('should log unhandled rejection');
    next();

};

exports.sentryTest10 = (req, res, next) => {

    // raven.context({
    //     extra: {
    //         fullMessage: {
    //             token: '1234',
    //             message: 'coucou',
    //             options: {
    //                 priority: 'high'
    //             }
    //         }
    //     }
    // });

    raven.captureMessage('Vivien created a message');

    raven.captureException('Vivien created an exception');

    next();

};
