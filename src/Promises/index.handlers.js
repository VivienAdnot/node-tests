import Boom from 'boom';
import Promise from 'bluebird';

const multiply = (nb, multiplier) => Promise.resolve(nb * multiplier);

const divide = (nb, divider) => Promise.resolve(nb / divider);

// async.waterfall equivalent
const chain = (req, res, next) => {

    const value = { test: 1 };

    Promise.delay(500)
        .then(() => multiply(value.test, 3))
        .then(data => divide(data, 2))
        .then((result) => {

            res.data = {
                val: result
            };
            next();

        });

};

const promiseAllExample = (req, res, next) =>

    Promise.all([
        Promise.delay(500).then(() => Promise.resolve(true)),
        Promise.delay(800).then(() => Promise.resolve(true))
    ])
        .then(([result1, result2]) =>

            ((result1 && result2)
                ? next()
                : next(Boom.internal('result 1 or result 2 is false'))))
        .catch(next);

module.exports = { chain, promiseAllExample };
