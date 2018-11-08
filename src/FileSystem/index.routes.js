import { writeFile, writeBigFile } from './index.handlers';
import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/writeFile',
    handlers: [
        writeFile,
        responseSender
    ]
}, {
    method: 'POST',
    path: '/writeBigFile',
    handlers: [
        writeBigFile,
        responseSender
    ]
}];

module.exports = routes;
