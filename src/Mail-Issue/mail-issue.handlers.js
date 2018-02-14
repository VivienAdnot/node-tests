var async = require('async');
var invitationHandlers = require('./invitationHandler');
var Promise = require('bluebird');

exports.writeFile = (req, res, next) => {

    const { total } = req.body;
    if (!total) {

        next(new Error('body must contain "total"'));
        return;

    }

    for(let i = 0; i < total; i++) {

        fs.appendFile(`/Users/vivienadnot/Documents/mailing-list-${total}.txt`, `elie+${total}-${i}@jetable.org\n`, (err) => {
            if (err) throw err;
        });

    }

    next();

},

exports.testAsync = (req, res, next) => {

    console.log('testAsync start batch');

    const { emails: batch } = req.body;

    async.eachLimit(batch, 1, (email, callback) => {

        console.log('async.eachLimit new iteration');

        invitationHandlers.dummyAsync().finally(callback);

    }, () => {

        console.log('eachLimit complete, end');

    });

}