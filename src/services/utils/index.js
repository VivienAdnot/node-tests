import jwt from 'jsonwebtoken';
import config from '../../../config';

const generateJwtToken = (payload) => {

    const token = jwt.sign(payload, config.jwtSecret);
    return `Bearer ${token}`;

};

export default generateJwtToken;
