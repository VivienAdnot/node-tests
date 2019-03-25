const handlers = require('./index.handlers');
const responseSender = require('../services/responseSender');

const routes = [{
    method: 'GET',
    path: '/exec',
    handlers: [
        handlers.execCmd,
        responseSender.responseSender
    ]
}];

module.exports = routes;
