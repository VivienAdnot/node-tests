import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'GET',
    path: '/testFailRoute',
    handlers: [
        (req, res, next) => {

            if (true) {

                throw new Error('fail route throws');

            }

            next();

        },
        responseSender
    ]
}];

module.exports = routes;
