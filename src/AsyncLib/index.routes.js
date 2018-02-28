var handlers = require('./index.handlers');
var responseSender = require('../services/responseSender');

const routes = [{
    method: 'POST',
    path: '/testAsyncWaterfall',
    handlers: [
        handlers.testAsyncWaterfall,
        responseSender.responseSender
    ]
}, {
    method: 'POST',
    path: '/testAsyncEachLimitWithPromise',
    handlers: [
        handlers.testAsyncEachLimitWithPromise,
        responseSender.responseSender
    ]
}];

module.exports = routes;