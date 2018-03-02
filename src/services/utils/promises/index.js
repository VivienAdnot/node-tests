import Promise from 'bluebird';

exports.delayedResolve = (val, timeout = 300, verbose = false) => {

    if (verbose) {

        console.log('delayedResolve start');

    }

    return new Promise((resolve) => {

        setTimeout(() => {

            if (verbose) {

                console.log('delayedResolve resolve', val);

            }

            resolve(val);

        }, timeout);

    });

};
