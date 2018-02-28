var handlers = require('./index.handlers');
var responseSender = require('../services/responseSender');

const routes = [{
    method: 'POST',
    path: '/testPromiseAll',
    handlers: [
        handlers.testPromiseAll,
        responseSender.responseSender
    ]
}];

module.exports = routes;