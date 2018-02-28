var Promise = require('bluebird');
var promisesUtils = require('../services/utils/promises/index');

const generatorPromiseAll = () => {
    return Promise.all([
        promisesUtils.delayedResolve(true, 1200),
        promisesUtils.delayedResolve(true, 800)
    ]);
};

const intermediateFunc = () => {
    if (true == false) {
        return Promise.resolve();
    }

    return generatorPromiseAll()
        .then(([result1, result2]) =>  (result1 && result2)
                ? Promise.resolve()
                : Promise.reject(new Error("result 1 or result 2 is false"))

        );
}

exports.testPromiseAll = (req, res, next) => {

    intermediateFunc()
        .then(result => {

            res.data = "final then called";
            next();

        })
        .catch(next);

};
