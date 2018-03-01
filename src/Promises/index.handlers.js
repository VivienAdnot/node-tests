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