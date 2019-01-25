import fs from 'fs';

export const writeFile = (req, res, next) => {

    const { total } = req.body;

    if (!total) {

        next(new Error('body must contain "total"'));
        return;

    }

    for (let i = 0; i < total; i += 1) {

        fs.appendFile(
            `/Users/vivienadnot/Documents/mailing-list/mailing-list-${total}.txt`,
            `elie+${total}-${i}@jetable.org\n`,
            (err) => {

                if (err) throw err;

            }
        );

    }

    next();

};

export const writeBigFile = (req, res, next) => {

    const { total } = req.body;

    if (!total) {

        next(new Error('body must contain "total"'));
        return;

    }

    for (let i = 0; i < total; i += 1) {

        fs.appendFile(
            `/Users/vivienadnot/Documents/mailing-list/big-mailing-list-${total}.txt`,
            `elie+${total}-${i}@jetable.org\n`,
            (err) => {

                if (err) throw err;

            }
        );

    }

    next();

};

export const getFile = (req, res, next) => {

    res.download('/Users/vivienadnot/Documents/mailing-list/mailing-list-3.txt');

};
