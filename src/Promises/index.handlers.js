import Promise from 'bluebird';

import { delayedResolve } from '../services/utils/promises/index';

const generatorPromiseAll = () => {
    return Promise.all([
        delayedResolve(true, 1200),
        delayedResolve(true, 800)
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

    return Promise.resolve()
        .then(result => {

            res.data = "final then called";
            next();

        })
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