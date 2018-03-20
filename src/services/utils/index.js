import jwt from 'jsonwebtoken';

export const generateJwtToken = (payload) => {

    const token = jwt.sign(payload, 'VIVIEN');
    return `Bearer ${token}`;

};
