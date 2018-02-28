var handlers = require('./index.handlers');
var responseSender = require('../services/responseSender');

const routes = [{
    method: 'POST',
    path: '/writeFile',
    handlers: [
        handlers.writeFile,
        responseSender.responseSender
    ]
}];

module.exports = routes;