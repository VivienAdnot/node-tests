import Boom from 'boom';
import Promise from 'bluebird';
import { logAndResolve } from '../services/utils/promises/index';

const request = Promise.promisify(require('request'));

const multiply = (nb, multiplier) => Promise.resolve(nb * multiplier);

const divide = (nb, divider) => Promise.resolve(nb / divider);

// async.waterfall equivalent
export const chain = (req, res, next) => {

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

export const promiseAllExample = (req, res, next) =>

    Promise.all([
        Promise.delay(500).then(() => Promise.resolve(true)),
        Promise.delay(800).then(() => Promise.resolve(true))
    ])
        .then(([result1, result2]) =>

            ((result1 && result2)
                ? next()
                : next(Boom.internal('result 1 or result 2 is false'))))
        .catch(next);

export const promiseMapExample = (req, res, next) =>

    Promise.map([500, 950, 800, 300], (duration, index) =>

        Promise.delay(duration).then(() => logAndResolve(index))

    )
        .then((results) => {

            res.data = {
                data: results
            };
            next();

        })
        .catch(next);

export const returnOrReject = (req, res, next) => {

    const { data } = req.body;

    Promise.resolve(data)
        .then(result => result || Promise.reject(Boom.forbidden()))
        .then(() => {

            res.data = {
                data: 'OK'
            };
            next();
            return Promise.resolve();

        })
        .catch(next);

};

export const ternary = (req, res, next) => {

    const { data } = req.body;

    Promise.resolve(data)
        .then(result => ((result % 2 === 0)
            ? result
            : Promise.reject(Boom.forbidden())
        ))
        .then(() => {

            res.data = {
                data: 'OK'
            };
            next();
            return Promise.resolve();

        })
        .catch(next);

};

export const ternaryReversed = (req, res, next) => {

    const { email } = req.body;

    const emailAlreadyExists = emailToCheck => Promise.delay(500).then(() => true);

    emailAlreadyExists(email)
        .then(result => ((result)
            ? Promise.reject(Boom.conflict('email already exists'))
            : Promise.resolve()
        ))
        .then(() => {

            res.data = {
                data: 'OK'
            };
            next();
            return Promise.resolve();

        })
        .catch(next);

};

export const promiseAllTruthyFalsy = (req, res, next) => {

    const { data1, data2 } = req.body;
    const test = data1 === data2;

    Promise.all([
        test || Promise.reject(Error('not eq')),
        Promise.delay(500).then(() => true)
    ]).then(() => {

        res.data = {
            data: 'OK'
        };
        next();
        return Promise.resolve();

    }).catch((error) => {

        res.data = {
            data: 'NOK',
            message: error.message
        };
        next();
        return null;

    });

};

export const promisify = (req, res, next) => {

    const uri = 'https://twitterXXXXXXXXXXXX.com/unclebobmartin';

    return request({
        method: 'GET',
        uri,
        followRedirect: true,
        maxRedirects: 2
    })
        .then(({ statusCode }) => {

            res.data = statusCode;
            next();

        })
        .catch((err) => {

            next(err);

        });

};
