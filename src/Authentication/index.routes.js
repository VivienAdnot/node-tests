import passport from 'passport';
import { proceedSuccessLoginUser } from './index.handlers';
import { responseSender } from '../services/responseSender';

const authenticateUser = passport.authenticate('local', { session: false });

const routes = [{
    method: 'POST',
    path: '/login-user',
    handlers: [
        authenticateUser,
        proceedSuccessLoginUser,
        responseSender
    ]
}];

export default routes;
