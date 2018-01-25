var responseSender = require('./responseSender');

const routes = [{
    method: 'GET',
    path: 'api/visits',
    handlers: [ responseSender ]
}];

module.exports = { routes };