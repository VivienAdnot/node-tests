import handlers from './index.handlers';
import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/pushNotificationToken',
    handlers: [
        handlers.pushNotificationToken,
        responseSender
    ]
}, {
    method: 'POST',
    path: '/sendToDeviceGroup',
    handlers: [
        handlers.sendToDeviceGroup,
        responseSender
    ]
}];

module.exports = routes;
