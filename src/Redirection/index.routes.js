import handlers from './index.handlers';
import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/redirect/:_user/pushNotificationToken',
    handlers: [
        handlers.pushNotificationToken,
        responseSender
    ]
}, {
    method: 'POST',
    path: '/v2/redirect/:_user/pushNotificationToken',
    handlers: [
        handlers.pushNotificationTokenV2,
        responseSender
    ]
}];

module.exports = routes;
