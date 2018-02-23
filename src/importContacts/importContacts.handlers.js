var async = require('async');
//var invitationHandlers = require('./invitationHandler');
var Promise = require('bluebird');
var fs = require('fs');

exports.writeFile = (req, res, next) => {

    const { total } = req.body;
    if (!total) {

        next(new Error('body must contain "total"'));
        return;

    }

    for(let i = 0; i < total; i++) {

        fs.appendFile(`/Users/vivienadnot/Documents/mailing-list/mailing-list-${total}.txt`, `elie+${total}-${i}@jetable.org\n`, (err) => {
            if (err) throw err;
        });

    }

    next();

},

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

const asyncDummy = (val) => {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(val);
        }, val * 100);
    })
}

exports.testAsyncEachLimit = (req, res, next) => {

    let batch = [25, 6, 35, 9, 15, 5];

    async.eachLimit(batch, 3, (val, callback) => {

        console.log(`${val} started`);

        asyncDummy(val)
            .then((result) => console.log(`${val} end`))
            .finally(callback);

    }, () => {
        console.log('final callback called');
        res.data = "done";
        next();
    })
}
