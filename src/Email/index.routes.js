import handlers from './index.handlers';
import validators from './index.validators';
import { responseSender } from '../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/isEmailValid',
    handlers: [
        validators.isEmailValid,
        //handlers.isEmailValid,
        responseSender
    ]
}];

module.exports = routes;
