var handlers = require('./anchors.handlers');
var responseSender = require('../services/responseSender');

const routes = [{
    method: 'POST',
    path: '/anchors',
    handlers: [
        handlers.postAnchors,
        responseSender.responseSender
    ]
}];

module.exports = routes;