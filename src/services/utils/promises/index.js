var Promise = require('bluebird');

exports.delayedResolve = (val, timeout = 300) => {

    console.log("delayedResolve start");

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("delayedResolve resolve", val);
            resolve(val);
        }, timeout);
    })
};
