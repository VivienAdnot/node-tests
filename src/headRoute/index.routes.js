import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'HEAD',
    path: '/testHeadRoute',
    handlers: [
        (req, res, next) => {

            res.data = {
                test: 'OK'
            };
            next();

        },
        responseSender
    ]
}];

module.exports = routes;
