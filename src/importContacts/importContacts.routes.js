var handlers = require('./importContacts.handlers');
var responseSender = require('../services/responseSender');

const routes = [{
    method: 'POST',
    path: '/writeFile',
    handlers: [
        handlers.writeFile,
        responseSender.responseSender
    ]
}, {
    method: 'POST',
    path: '/testAsyncWaterfall',
    handlers: [
        handlers.testAsyncWaterfall,
        responseSender.responseSender
    ]
}, {
    method: 'POST',
    path: '/testAsyncEachLimit',
    handlers: [
        handlers.testAsyncEachLimit,
        responseSender.responseSender
    ]
}];

module.exports = routes;