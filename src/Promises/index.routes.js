var handlers = require('./index.handlers');
var responseSender = require('../services/responseSender');

const routes = [{
    method: 'POST',
    path: '/promiseAllShowcase',
    handlers: [
        handlers.promiseAllShowcase,
        responseSender.responseSender
    ]
}, {
    method: 'POST',
    path: '/postUserRelation',
    handlers: [
        handlers.postUserRelation,
        responseSender.responseSender
    ]
}, {
    method: 'POST',
    path: '/waterfallSpread',
    handlers: [
        handlers.waterfallSpread,
        responseSender.responseSender
    ]
}];

module.exports = routes;
