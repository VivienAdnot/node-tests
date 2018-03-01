var handlers = require('./index.handlers');
var responseSender = require('../services/responseSender');

const routes = [{
    method: 'POST',
    path: '/postUserRelation',
    handlers: [
        handlers.postUserRelation,
        responseSender.responseSender
    ]
}];

module.exports = routes;
