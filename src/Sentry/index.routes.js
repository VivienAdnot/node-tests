import handlers from './index.handlers';
import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'GET',
    path: '/sentry1',
    handlers: [
        handlers.sentryTest1,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/sentry2',
    handlers: [
        handlers.sentryTest2,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/sentry3',
    handlers: [
        handlers.sentryTest3,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/sentry4',
    handlers: [
        handlers.sentryTest4,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/sentry5',
    handlers: [
        handlers.sentryTest5,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/sentry6',
    handlers: [
        handlers.sentryTest6,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/sentry7',
    handlers: [
        handlers.sentryTest7,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/sentry8',
    handlers: [
        handlers.sentryTest8,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/sentry9',
    handlers: [
        handlers.sentryTest9,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/sentry10',
    handlers: [
        handlers.sentryTest10,
        responseSender
    ]
}];

module.exports = routes;
