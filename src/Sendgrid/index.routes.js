import handlers from './index.handlers';
import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/sendValidEmail',
    handlers: [
        handlers.sendValidEmail,
        responseSender
    ]
}, {
    method: 'POST',
    path: '/webhook',
    handlers: [
        handlers.webhook,
        responseSender
    ]
}];

module.exports = routes;
