import { writeFile } from './index.handlers';
import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/writeFile',
    handlers: [
        writeFile,
        responseSender
    ]
}];

module.exports = routes;
