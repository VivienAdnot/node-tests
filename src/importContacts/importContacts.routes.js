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
    path: '/testAsync',
    handlers: [
        handlers.testAsync,
        responseSender.responseSender
    ]
}];

module.exports = routes;