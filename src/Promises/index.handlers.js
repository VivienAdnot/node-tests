import Boom from 'boom';
import Promise from 'bluebird';
import { delayedResolve } from '../services/utils/promises/index';

const multiply = (nb, multiplier) => Promise.resolve(nb * multiplier);

const divide = (nb, divider) => Promise.resolve(nb / divider);

// async.waterfall equivalent
exports.chain = (req, res, next) => {

    const value = { test: 1 };

    delayedResolve(value)
        .then(data => multiply(data.test, 3))
        .then(data => divide(data, 2))
        .then((result) => {

            res.data = {
                val: result
            };
            next();

        });

};

exports.promiseAllExample = (req, res, next) =>

    Promise.all([
        delayedResolve(true, 800),
        delayedResolve(true, 500)
    ])
        .then(([result1, result2]) =>

            ((result1 && result2)
                ? next()
                : next(Boom.internal('result 1 or result 2 is false'))))
        .catch(next);
