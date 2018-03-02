import Promise from 'bluebird';
import { delayedResolve } from '../services/utils/promises/index';

const intermediateFunc = () => {

    if (true === false) {

        return Promise.resolve();

    }

    return Promise.all([
        delayedResolve(true, 1200),
        delayedResolve(true, 800)
    ]).then(([result1, result2]) =>

        ((result1 && result2)
            ? Promise.resolve()
            : Promise.reject(new Error('result 1 or result 2 is false'))));

};

export const promiseAllShowcase = (req, res, next) => {

    intermediateFunc()
        .then(() => next())
        .catch(next);

};

export const postUserRelation = (req, res, next) => {

    console.log('start handler');

    return Promise.resolve('test')
        .then((result) => {

            console.log('handler then start', result);
            next();

            return Promise.resolve();

        })
        .catch(next);

};

const multiply = (nb, multiplier) => delayedResolve(nb * multiplier);

export const waterfallSpread = (req, res, next) => {

    const value = {
        test: 1
    };

    delayedResolve(value)
        .then(data =>

            multiply(data.test, 2)
                .then((newValue) => {

                    const result = {
                        newValue,
                        ...data
                    };

                    return result;

                }))
        .then((val) => {

            res.data = {
                data: val
            };

            next();

        });

};
