import generateJwtToken from '../services/utils';
import { getCredentialsByUserId } from '../services/database/model';

exports.proceedSuccessLoginUser = (req, res, next) => {

    getCredentialsByUserId(req.user.id)
        .then((credentials) => {

            res.data = {
                token: generateJwtToken({ id: credentials.id }),
                ...req.user
            };
            next();

            return Promise.resolve();

        });

};

exports.protectedUser = (req, res, next) => {

    res.data = {
        data: {
            name: 'protected ressource user',
            user: req.user
        }
    };
    next();
    return Promise.resolve();

};
