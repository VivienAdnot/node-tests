var async = require('async');
var Promise = require('bluebird');

exports.handleInvitation = (mail) => {

    return new Promise((resolve) => {

        async.waterfall([

            (callback) => {

                callback(null, {
                    result: "ok"
                });
            }],
            (err, context) => {

                if (err) {

                    console.error(err);
                    resolve({
                        result: null
                    });
                    return;

                }

                resolve(context);

            });

    });


};

exports.dummyAsync = () => {
    setTimeout(() => {
        console.log("dummyAsync will resolve");
        Promise.resolve();
    }, 300);
}