import jwt from 'jsonwebtoken';
import { getUserById } from '../services/passport/model';

const generateJwtToken = (payload) => {

    const token = jwt.sign(payload, 'VIVIEN');
    return `Bearer ${token}`;

};

exports.proceedSuccessLogin = (req, res, next) => {

    res.data = {
        token: generateJwtToken({ id: req.user.id }),
        ...req.user
    };
    next();

    return Promise.resolve();

};
