import { chain, promiseAllExample } from './index.handlers';
import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/chain',
    handlers: [
        chain,
        responseSender
    ]
}, {
    method: 'POST',
    path: '/promiseAll',
    handlers: [
        promiseAllExample,
        responseSender
    ]
}];

module.exports = routes;
