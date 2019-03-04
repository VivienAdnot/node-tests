const handlers = require('./index.handlers');
const responseSender = require('../services/responseSender');

const routes = [{
    method: 'GET',
    path: '/runWorker',
    handlers: [
        handlers.runWorker,
        responseSender.responseSender
    ]
}];

module.exports = routes;
