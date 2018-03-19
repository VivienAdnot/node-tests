import jwt from 'jsonwebtoken';
import { getCredentialsByUserId } from '../services/database/model';

const generateJwtToken = (payload) => {

    const token = jwt.sign(payload, 'VIVIEN');
    return `Bearer ${token}`;

};

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
