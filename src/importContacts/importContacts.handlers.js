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

exports.testAsync = (req, res, next) => {

    async.waterfall([
        function (callback) {
            console.log('First Step --> ');
            callback(null, '1', '2');
        },
        function (arg1, arg2, callback) {
            console.log('Second Step --> ' + arg1 + ' ' + arg2);
            callback(null, '3');
        },
        function (arg1, callback) {
            console.log('Third Step --> ' + arg1);
            callback(null, 'final result');
        }
    ], function (err, result) {
        console.log('Main Callback --> ' + result);
        res.data = result;
        next();
    });

    console.log('Program End');
}