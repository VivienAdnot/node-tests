import { chain, promiseAllExample, promiseMapExample } from './index.handlers';
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
}, {
    method: 'POST',
    path: '/promiseMap',
    handlers: [
        promiseMapExample,
        responseSender
    ]
}];

module.exports = routes;
