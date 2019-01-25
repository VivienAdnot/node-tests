import * as handlers from './index.handlers';
import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/writeFile',
    handlers: [
        handlers.writeFile,
        responseSender
    ]
}, {
    method: 'POST',
    path: '/writeBigFile',
    handlers: [
        handlers.writeBigFile,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/getFile',
    handlers: [
        handlers.getFile,
        responseSender
    ]
}];

module.exports = routes;
