import handlers from './index.handlers';
import responseSender from '../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/gen',
    handlers: [
        handlers.postPassword,
        responseSender.responseSender
    ]
}];

module.exports = routes;
