import passport from 'passport';
import {
    chain,
    promiseAllExample,
    promiseMapExample,
    returnOrReject,
    ternary,
    promiseAllTruthyFalsy
} from './index.handlers';
import { responseSender } from '../services/responseSender';

const requireAuth = passport.authenticate('jwt', { session: false });

const routes = [{
    method: 'POST',
    path: '/chain',
    handlers: [
        requireAuth,
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
}];

module.exports = routes;
