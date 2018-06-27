import {
    chain,
    promiseAllExample,
    promiseMapExample,
    returnOrReject,
    ternary,
    ternaryReversed,
    promiseAllTruthyFalsy,
    promisify
} from './index.handlers';
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
    path: '/returnOrReject',
    handlers: [
        returnOrReject,
        responseSender
    ]
}, {
    method: 'POST',
    path: '/ternary',
    handlers: [
        ternary,
        responseSender
    ]
}, {
    method: 'POST',
    path: '/ternaryReversed',
    handlers: [
        ternaryReversed,
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
}, {
    method: 'POST',
    path: '/promiseAllTruthyFalsy',
    handlers: [
        promiseAllTruthyFalsy,
        responseSender
    ]
}, {
    method: 'POST',
    path: '/promisify',
    handlers: [
        promisify,
        responseSender
    ]
}];

module.exports = routes;
