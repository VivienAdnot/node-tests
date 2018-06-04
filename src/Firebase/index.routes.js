import handlers from './index.handlers';
import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/pushNotificationToken',
    handlers: [
        handlers.pushNotificationToken,
        responseSender
    ]
}];

module.exports = routes;
