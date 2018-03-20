import { generateJwtToken } from '../services/utils';
import { getCredentialsByCompanyId } from '../services/database/model';

exports.proceedSuccessLoginCompany = (req, res, next) => {

    getCredentialsByCompanyId(req.company.id)
        .then((credentials) => {

            res.data = {
                token: generateJwtToken({ id: credentials.id }),
                ...req.company
            };
            next();

            return Promise.resolve();

        });

};

exports.protectedCompany = (req, res, next) => {

    res.data = {
        data: {
            name: 'protected ressource company',
            company: req.company
        }
    };
    next();
    return Promise.resolve();

};
