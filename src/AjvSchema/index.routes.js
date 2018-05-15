import handlers from './index.handlers';
import responseSender from '../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/anchors',
    handlers: [
        handlers.postAnchors,
        responseSender.responseSender
    ]
}];

module.exports = routes;
