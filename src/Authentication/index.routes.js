import passport from 'passport';
import { proceedSuccessLogin } from './index.handlers';
import { responseSender } from '../services/responseSender';

const authenticateUser = passport.authenticate('local', { session: false });

const routes = [{
    method: 'POST',
    path: '/login',
    handlers: [
        authenticateUser,
        proceedSuccessLogin,
        responseSender
    ]
}];

export default routes;
