var async = require('async');
var Promise = require('bluebird');

exports.testAsyncWaterfall = (req, res, next) => {

    async.waterfall([
        function (callback) {

            console.log('First Step --> ');

            setTimeout(() => {

                callback(null, '1', '2');

            }, 500);

        },
        function (arg1, arg2, callback) {

            console.log('Second Step --> ' + arg1 + ' ' + arg2);

            setTimeout(() => {

                callback(null, '3');

            }, 1500);

        },
        function (arg1, callback) {

            console.log('Third Step --> ' + arg1);

            setTimeout(() => {

                callback(null, 'final result');

            }, 500);

        }
    ], function (err, result) {
        console.log('Main Callback --> ' + result);
        res.data = result;
        next();
    });

    console.log('Program End');
}

const asyncDummyPromise = (val) => {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(val);
        }, val * 100);
    })
}

exports.testAsyncEachLimitWithPromise = (req, res, next) => {

    let batch = [25, 6, 35, 9, 15, 5];

    async.eachLimit(batch, 3, (val, callback) => {

        console.log(`${val} started`);

        asyncDummyPromise(val)
            .then((result) => console.log(`${val} end`))
            .finally(callback);

    }, () => {
        console.log('final callback called');
        res.data = "done";
        next();
    })
}
